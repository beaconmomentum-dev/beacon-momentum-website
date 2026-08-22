import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerWatchStripeTestWebhook, registerWatchStripeWebhook } from "../payment/watchWebhook";
import { deliverPendingPaymentNotifications } from "../payment/paymentNotificationOutbox";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Stripe signatures require the exact raw request body; this must precede
  // the global JSON parser and any middleware that consumes request bodies.
  registerWatchStripeWebhook(app);
  registerWatchStripeTestWebhook(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  const legacySearch = (req: Request) => {
    const queryIndex = req.originalUrl.indexOf("?");
    return queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : "";
  };

  app.get("/blog", (req, res) => {
    res.redirect(308, `/signal${legacySearch(req)}`);
  });

  app.get("/blog/:slug", (req, res) => {
    res.redirect(308, `/signal/${req.params.slug}${legacySearch(req)}`);
  });

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof URIError) {
      res.status(400).send("Bad Request");
      return;
    }
    console.error("[Server] Unhandled error:", err.message);
    res.status(500).send("Internal Server Error");
  });

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));

  // Stripe retries any failed lifecycle persistence itself. This separate outbox
  // loop retries only the downstream Phoenix notification handoff, so a delayed
  // CRM notice cannot replay a customer charge or block checkout acknowledgement.
  const deliverPaymentOutbox = async () => {
    try {
      const result = await deliverPendingPaymentNotifications();
      if (result.delivered || result.retried || result.deadLettered) {
        console.info("[Payment notification outbox]", result);
      }
    } catch (error) {
      console.error("[Payment notification outbox] delivery loop failed", error);
    }
  };
  void deliverPaymentOutbox();
  setInterval(() => void deliverPaymentOutbox(), 60_000).unref();
}

startServer().catch(console.error);
