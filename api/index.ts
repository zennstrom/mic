import express, { Request, Response, NextFunction } from "express";

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Health Check Endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Catch-all for unknown API routes
app.all("/api/*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Export for Vercel serverless function
export default app;
