import express, { Request, Response, NextFunction } from "express";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API Health Check Endpoint (useful for cloud platform readiness checks)
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Resolve static files directory
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "client", "dist"),
  ];

  const staticPath = candidates.find((dir) => fs.existsSync(dir)) || candidates[0];

  // Serve static files
  app.use(express.static(staticPath));

  // SPA Fallback for client-side routing
  app.get("*", (req: Request, res: Response) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ error: "API endpoint not found" });
      return;
    }

    const indexPath = path.join(staticPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Build Required</title>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
              .card { background: #1e293b; padding: 2rem 3rem; border-radius: 0.75rem; border: 1px solid #334155; text-align: center; max-width: 480px; }
              h2 { margin-top: 0; color: #38bdf8; }
              code { background: #0f172a; padding: 0.2rem 0.5rem; border-radius: 0.25rem; color: #f43f5e; font-family: monospace; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Production Build Needed</h2>
              <p>The client bundle index.html was not found in static directory.</p>
              <p>Run <code>npm run build</code> to generate the client build.</p>
            </div>
          </body>
        </html>`
      );
    }
  });

  // Global Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Server Error:", err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  const preferredPort = parseInt(process.env.PORT || "5000", 10);
  const host = "0.0.0.0";

  function listenOnPort(portToTry: number) {
    server.removeAllListeners("error");
    server.on("error", (err: NodeJS.ErrnoException) => {
      if (err.code === "EADDRINUSE" && !process.env.PORT && portToTry < preferredPort + 10) {
        console.warn(`Port ${portToTry} is in use, trying port ${portToTry + 1}...`);
        listenOnPort(portToTry + 1);
      } else {
        console.error(`Failed to start server on port ${portToTry}:`, err.message);
        process.exit(1);
      }
    });

    server.listen(portToTry, host, () => {
      console.log(`🚀 Production server running on http://${host}:${portToTry}`);
    });
  }

  listenOnPort(preferredPort);
}

startServer().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
