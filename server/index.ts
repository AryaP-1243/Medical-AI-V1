import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
// import {
//   handleLogin,
//   handleRegister,
//   handleGetCurrentUser,
//   handleUpdateProfile,
//   handleChangePassword,
//   handleGetUserStats,
//   handleLogout
// } from "./routes/auth";
import {
  handleSimpleLogin,
  handleSimpleRegister,
  handleSimpleMe
} from "./routes/simpleAuth";
// import { AuthUtils } from "./utils/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // Debug auth endpoint
  app.get("/api/auth/test", (req, res) => {
    res.json({ message: "Auth endpoints are working", timestamp: new Date().toISOString() });
  });

  // Simple Authentication routes (no JWT dependency)
  app.post("/api/auth/login", handleSimpleLogin);
  app.post("/api/auth/register", handleSimpleRegister);
  app.get("/api/auth/me", handleSimpleMe);

  // Simple logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    res.json({ success: true, message: "Logout successful" });
  });

  // Simple protected test route
  app.get("/api/auth/protected", (req, res) => {
    res.json({
      message: "This is a protected route (simple auth)",
      timestamp: new Date().toISOString()
    });
  });

  return app;
}
