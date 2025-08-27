import { RequestHandler } from "express";
import { SymptomAnalyzerService } from "../services/symptomAnalyzer.service";
import { SymptomAnalysisRequest } from "@shared/api";
import { AuthenticatedRequest } from "../utils/auth";

export const handleSymptomAnalysis: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const { symptoms } = req.body;
    const userId = req.userId; // Attached by the authenticateToken middleware

    if (!symptoms) {
      return res.status(400).json({ error: "Symptom description is required." });
    }

    // Here you could potentially fetch the user's profile from the database
    // using the userId and pass it to the analyzer service.
    // For now, we'll just pass the symptoms.

    const requestData: SymptomAnalysisRequest = {
      symptoms,
      // userProfile: { age: 30, sex: 'male' } // Example of adding profile data
    };

    const analysisResponse = await SymptomAnalyzerService.analyze(requestData);

    res.json(analysisResponse);

  } catch (error) {
    console.error("Symptom analysis error:", error);
    res.status(500).json({ error: "An unexpected error occurred during symptom analysis." });
  }
};
