import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EnhancedThemeProvider } from "@/components/EnhancedTheme";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import Chat from "./pages/Chat";
import EnhancedChat from "./pages/EnhancedChat";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Appointments from "./pages/Appointments";
import Medications from "./pages/Medications";
import Features from "./pages/Features";
import HealthScore from "./pages/HealthScore";
import MentalHealth from "./pages/MentalHealth";
import FoodAnalyzer from "./pages/FoodAnalyzer";
import Gamification from "./pages/Gamification";
import MedicalResearch from "./pages/MedicalResearch";
import MedicationChecker from "./pages/MedicationChecker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EnhancedThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/* Core Medical Features */}
            <Route path="/symptom-analyzer" element={<SymptomAnalyzer />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/enhanced-chat" element={<EnhancedChat />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Advanced Medical Features */}
            <Route path="/health-score" element={<HealthScore />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/food-analyzer" element={<FoodAnalyzer />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/medical-research" element={<MedicalResearch />} />

            {/* Standard Health Features */}
            <Route path="/records" element={<Records />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medications" element={<MedicationChecker />} />
            <Route path="/features" element={<Features />} />

            {/* Legacy/Placeholder routes */}
            <Route path="/pricing" element={<Features />} />
            <Route path="/about" element={<Features />} />
            <Route path="/contact" element={<Features />} />
            <Route path="/privacy" element={<Features />} />
            <Route path="/terms" element={<Features />} />
            <Route path="/support" element={<Features />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </EnhancedThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
