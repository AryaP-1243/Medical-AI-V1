import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  Stethoscope,
  Brain,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Clock,
  User,
  Calendar,
  Pill
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SymptomAnalyzer() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        severity: "moderate",
        conditions: [
          { name: "Common Cold", probability: 75, description: "Viral respiratory infection" },
          { name: "Allergic Rhinitis", probability: 60, description: "Allergic reaction causing nasal symptoms" },
          { name: "Sinusitis", probability: 45, description: "Inflammation of sinus cavities" }
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Consider over-the-counter pain relievers",
          "Monitor symptoms for 24-48 hours",
          "Consult healthcare provider if symptoms worsen"
        ],
        urgency: "Monitor closely",
        nextSteps: "Schedule routine consultation"
      });
      setAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-500";
      case "moderate": return "bg-yellow-500";
      case "high": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">AI Symptom Analyzer</span>
          </div>
          
          <AuthNav variant="app" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Analysis
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Symptom
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Analysis
            </span>
          </h1>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Describe your symptoms and get instant AI-powered medical insights 
            and recommendations from our advanced health intelligence system.
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">
                Describe your symptoms
              </label>
              <Textarea
                placeholder="Please describe your symptoms in detail... (e.g., headache, nausea, fever, duration, severity)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px] resize-none"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Duration</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option value="">Select duration</option>
                  <option value="hours">A few hours</option>
                  <option value="1-2days">1-2 days</option>
                  <option value="3-7days">3-7 days</option>
                  <option value="weeks">Several weeks</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Severity</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option value="">Rate severity</option>
                  <option value="mild">Mild (1-3)</option>
                  <option value="moderate">Moderate (4-6)</option>
                  <option value="severe">Severe (7-10)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Age Group</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                  <option value="">Select age</option>
                  <option value="child">Child (0-12)</option>
                  <option value="teen">Teen (13-17)</option>
                  <option value="adult">Adult (18-64)</option>
                  <option value="senior">Senior (65+)</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={!symptoms.trim() || analyzing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg font-semibold rounded-xl"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Severity Alert */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 p-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getSeverityColor(result.severity)}`}></div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400">
                    Assessment: {result.urgency}
                  </h3>
                  <p className="text-white/70">
                    Based on your symptoms, we recommend {result.nextSteps.toLowerCase()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Possible Conditions */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Stethoscope className="w-6 h-6 mr-3 text-blue-400" />
                Possible Conditions
              </h3>
              
              <div className="space-y-4">
                {result.conditions.map((condition: any, index: number) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold">{condition.name}</h4>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {condition.probability}% match
                      </Badge>
                    </div>
                    <p className="text-white/70">{condition.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                Recommendations
              </h3>
              
              <div className="grid gap-3">
                {result.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{rec}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Schedule Consultation</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Book an appointment with a healthcare provider for professional evaluation.
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Book Appointment
                </Button>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Pill className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold">Medication Guide</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Learn about over-the-counter options and interactions to avoid.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  View Guide
                </Button>
              </Card>
            </div>

            {/* Warning */}
            <Card className="bg-red-500/20 border-red-500/30 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Important Disclaimer</h3>
                  <p className="text-white/80">
                    This AI analysis is for informational purposes only and should not replace professional medical advice. 
                    If you're experiencing severe symptoms or a medical emergency, contact emergency services immediately.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      </div>
    </ProtectedRoute>
  );
}
