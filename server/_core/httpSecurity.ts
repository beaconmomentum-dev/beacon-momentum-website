import express, {
  type ErrorRequestHandler,
  type Express,
  type Request,
} from "express";

const BODY_PARSER_ERRORS = new Map<string, number>([
  ["entity.parse.failed", 400],
  ["entity.too.large", 413],
  ["entity.verify.failed", 400],
  ["encoding.unsupported", 415],
  ["encoding.invalid", 400],
  ["request.aborted", 400],
  ["request.size.invalid", 400],
]);
const INVALID_COMPRESSION_CODES = new Set([
  "Z_DATA_ERROR",
  "Z_BUF_ERROR",
  "Z_STREAM_ERROR",
]);

/**
 * This application is served through the same-host Nginx reverse proxy.
 * Trust only loopback as a proxy hop; never trust client-supplied forwarding
 * headers when the request reaches an app listener directly.
 * Nginx must overwrite or safely append forwarding headers before deployment.
 */
export function configureTrustedProxy(app: Express) {
  app.set("trust proxy", "loopback");
}

/** Use Express's proxy-aware address; do not parse CF-Connecting-IP/XFF directly. */
export function getTrustedClientIp(req: Request): string {
  return req.ip || req.socket.remoteAddress || "unknown";
}

/** Keep production body-parser policy in one place; a smaller limit is injectable for isolated tests. */
export function createRequestBodyParsers(limit: string | number = "50mb") {
  return [
    express.json({ limit, inflate: true }),
    express.urlencoded({ limit, extended: true, inflate: true }),
  ] as const;
}

/** Normalize known body-parser client errors without echoing payloads or parser internals. */
export const requestBodyErrorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (typeof error !== "object" || error === null) {
    next(error);
    return;
  }

  const type = (error as { type?: unknown }).type;
  const compressionCode = (error as { code?: unknown }).code;
  const status =
    (typeof type === "string" ? BODY_PARSER_ERRORS.get(type) : undefined) ??
    (typeof compressionCode === "string" &&
    INVALID_COMPRESSION_CODES.has(compressionCode)
      ? 400
      : undefined);
  if (!status) {
    next(error);
    return;
  }

  const publicMessage =
    status === 413
      ? "Payload Too Large"
      : status === 415
        ? "Unsupported Media Type"
        : "Bad Request";
  res.status(status).type("text/plain").send(publicMessage);
};
