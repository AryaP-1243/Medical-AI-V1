import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleLogin,
  handleRegister,
  handleGetCurrentUser,
  handleUpdateProfile,
  handleChangePassword,
  handleGetUserStats,
  handleLogout
} from "./routes/auth";
import { AuthUtils }from "./utils/auth";
import { handleSymptomAnalysis } from "./routes/symptomAnalyzer";
import { handleGetDashboardData } from "./routes/dashboard";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong" });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // --- Authentication Routes ---
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);

  // --- User Management Routes (Protected) ---
  app.get("/api/users/me", AuthUtils.authenticateToken, handleGetCurrentUser);
  app.put("/api/users/me/profile", AuthUtils.authenticateToken, handleUpdateProfile);
  app.put("/api/users/me/password", AuthUtils.authenticateToken, handleChangePassword);
  app.get("/api/users/me/stats", AuthUtils.authenticateToken, handleGetUserStats);

  // --- AI Features (Protected) ---
  app.post("/api/symptom-analyzer", AuthUtils.authenticateToken, handleSymptomAnalysis);

  // --- Dashboard ---
  app.get("/api/dashboard", AuthUtils.authenticateToken, handleGetDashboardData);

  return app;
}

const app = createServer();
const port = process.env.PORT || 8081; // Use a different port for the backend
const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Backend server listening on http://${host}:${port}`);
});
