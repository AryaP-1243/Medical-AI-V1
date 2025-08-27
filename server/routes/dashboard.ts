import { RequestHandler } from "express";
import { DashboardService } from "../services/dashboard.service";
import { AuthenticatedRequest } from "../utils/auth";
import { userModel } from "../models/User";

export const handleGetDashboardData: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      // This should technically not be reached if middleware is applied correctly
      return res.status(401).json({ error: "Authentication required." });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const dashboardData = await DashboardService.getData(user);

    res.json(dashboardData);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "An unexpected error occurred while fetching dashboard data." });
  }
};
