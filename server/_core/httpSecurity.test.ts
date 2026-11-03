import express from "express";
import type { AddressInfo } from "node:net";
import { deflateSync, gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import type { Request } from "express";
import { getSessionCookieOptions } from "./cookies";
import {
  configureTrustedProxy,
  createRequestBodyParsers,
  getTrustedClientIp,
  requestBodyErrorHandler,
} from "./httpSecurity";

async function withBodyParserServer(
  limit: string | number,
  run: (baseUrl: string) => Promise<void>,
) {
  const app = express();
  const [jsonParser, urlencodedParser] = createRequestBodyParsers(limit);
  app.use(jsonParser, urlencodedParser);
  app.post("/echo", (req, res) => res.status(200).json(req.body));
  app.use(requestBodyErrorHandler);
  app.use(
    (error: unknown, _req: unknown, res: express.Response, _next: unknown) => {
      console.error("Unexpected test server error", error);
      res.status(500).send("Internal Server Error");
    },
  );

  const server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  const address = server.address() as AddressInfo;

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe("HTTP request parsing and proxy trust", () => {
  it("accepts valid gzip-compressed JSON through the production parser factory", async () => {
    await withBodyParserServer("1kb", async (baseUrl) => {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-encoding": "gzip",
        },
        body: gzipSync(
          Buffer.from(JSON.stringify({ ok: true, source: "test" })),
        ),
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ ok: true, source: "test" });
    });
  });

  it("accepts valid deflate-compressed form data", async () => {
    await withBodyParserServer("1kb", async (baseUrl) => {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "content-encoding": "deflate",
        },
        body: deflateSync(Buffer.from("name=Beacon&mode=test")),
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({ name: "Beacon", mode: "test" });
    });
  });

  it("returns a generic 400 for malformed JSON without echoing parser details", async () => {
    await withBodyParserServer("1kb", async (baseUrl) => {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: '{"unfinished":',
      });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Bad Request");
    });
  });

  it("returns a generic 400 for an invalid compressed stream", async () => {
    await withBodyParserServer("1kb", async (baseUrl) => {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-encoding": "gzip",
        },
        body: Buffer.from("not-a-gzip-stream"),
      });

      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Bad Request");
    });
  });

  it("enforces the limit after decompression and returns 413", async () => {
    await withBodyParserServer(128, async (baseUrl) => {
      const compressed = gzipSync(
        Buffer.from(JSON.stringify({ value: "x".repeat(1024) })),
      );
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-encoding": "gzip",
        },
        body: compressed,
      });

      expect(compressed.byteLength).toBeLessThan(128);
      expect(response.status).toBe(413);
      expect(await response.text()).toBe("Payload Too Large");
    });
  });

  it("returns 415 for an unsupported content encoding", async () => {
    await withBodyParserServer("1kb", async (baseUrl) => {
      const response = await fetch(`${baseUrl}/echo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-encoding": "br",
        },
        body: Buffer.from("{}"),
      });

      expect(response.status).toBe(415);
      expect(await response.text()).toBe("Unsupported Media Type");
    });
  });

  it("trusts only loopback as a reverse-proxy hop", () => {
    const app = express();
    configureTrustedProxy(app);
    const trustProxy = app.get("trust proxy fn") as (
      address: string,
      hop: number,
    ) => boolean;

    expect(trustProxy("127.0.0.1", 0)).toBe(true);
    expect(trustProxy("::1", 0)).toBe(true);
    expect(trustProxy("198.51.100.25", 0)).toBe(false);
  });

  it("uses Express's resolved client IP rather than raw forwarding headers", () => {
    const request = {
      ip: "198.51.100.25",
      socket: { remoteAddress: "127.0.0.1" },
      headers: {
        "cf-connecting-ip": "203.0.113.99",
        "x-forwarded-for": "203.0.113.99",
      },
    } as unknown as Request;

    expect(getTrustedClientIp(request)).toBe("198.51.100.25");
  });

  it("does not mark a cookie secure from an untrusted raw forwarded-proto header", () => {
    const request = {
      secure: false,
      protocol: "http",
      headers: { "x-forwarded-proto": "https" },
    } as unknown as Request;

    expect(getSessionCookieOptions(request).secure).toBe(false);
  });

  it("honors Express's secure state for a request through the trusted proxy", () => {
    const request = {
      secure: true,
      protocol: "https",
      headers: { "x-forwarded-proto": "https" },
    } as unknown as Request;

    expect(getSessionCookieOptions(request).secure).toBe(true);
  });
});
