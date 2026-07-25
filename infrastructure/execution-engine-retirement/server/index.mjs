/**
 * Execution Engine retirement redirect
 *
 * This process intentionally uses only Node.js core modules. The former
 * standalone course, checkout, analytics, database, and third-party service
 * integrations have been retired. The curriculum now lives as Venture
 * Execution Sprint inside Beacon Venture for Watch members.
 */
import { createServer } from "node:http";

const destination = "https://beaconmomentum.com/the-watch";
const port = Number.parseInt(process.env.PORT || "3011", 10);

const server = createServer((_request, response) => {
  response.writeHead(302, {
    Location: destination,
    "Cache-Control": "no-store, max-age=0",
    "Content-Length": "0",
  });
  response.end();
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Execution Engine retired; redirecting all requests to ${destination}`);
});
