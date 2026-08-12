import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import { renderRouteMetadata } from "@shared/routeMetadata";
import viteConfig from "../../vite.config";

function isDocumentRequest(requestPath: string): boolean {
  return !path.extname(requestPath);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const config =
    typeof viteConfig === "function"
      ? await viteConfig({
          command: "serve",
          mode: process.env.NODE_ENV ?? "development",
          isSsrBuild: false,
          isPreview: false,
        })
      : viteConfig;

  const vite = await createViteServer({
    ...config,
    configFile: false,
    server: { ...config.server, ...serverOptions },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(renderRouteMetadata(page, req.path));
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }

  // Prevent the static middleware from serving index.html before route metadata can be injected.
  app.use(express.static(distPath, { index: false }));

  app.get("*", (req, res) => {
    if (!isDocumentRequest(req.path)) {
      res.status(404).end();
      return;
    }

    try {
      const template = fs.readFileSync(indexPath, "utf-8");
      res.status(200).type("html").send(renderRouteMetadata(template, req.path));
    } catch (error) {
      console.error("Could not render route metadata:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}
