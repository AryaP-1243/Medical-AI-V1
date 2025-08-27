import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import {
  Stethoscope,
  Brain,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Pill,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { SymptomAnalysisResponse } from "@shared/api";

export default function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const token = localStorage.getItem('medassist_token');
      const response = await fetch('/api/symptom-analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysisResult: SymptomAnalysisResponse = await response.json();
      setResult(analysisResult);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'High': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'Emergency': return 'bg-red-500/20 border-red-500/30 text-red-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
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
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Analysis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Symptom <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Analysis</span></h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Describe your symptoms and get instant AI-powered medical insights and recommendations.
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">Describe your symptoms</label>
              <Textarea
                placeholder="e.g., I have a throbbing headache on one side of my head and I feel nauseous. It's been happening for 3 hours."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px] resize-none"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={!symptoms.trim() || analyzing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg font-semibold rounded-xl"
            >
              {analyzing ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Analyzing Symptoms...</>
              ) : (
                <><Brain className="w-5 h-5 mr-2" />Analyze Symptoms</>
              )}
            </Button>
          </div>
        </Card>

        {error && (
          <Card className="bg-red-500/20 border-red-500/30 p-6 flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="text-lg font-semibold text-red-400">Analysis Error</h3>
              <p className="text-white/80">{error}</p>
            </div>
          </Card>
        )}

        {result && (
          <div className="space-y-6">
            <Card className={`p-6 border ${getUrgencyColor(result.urgency_level)}`}>
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-semibold">{result.urgency_level} Urgency ({result.urgency_score}/10)</h3>
                  <p className="text-white/80">{result.triage_advice}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Stethoscope className="w-6 h-6 mr-3 text-blue-400" />
                Potential Conditions
              </h3>
              <div className="space-y-4">
                {result.potential_conditions.map((condition, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold">{condition.condition}</h4>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {(condition.probability * 100).toFixed(0)}% probability
                      </Badge>
                    </div>
                    <p className="text-white/70">{condition.description}</p>
                    <p className="text-xs text-white/50 mt-2">Common symptoms: {condition.common_symptoms.join(', ')}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                Structured Report
              </h3>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
                <h4 className="text-lg font-bold">{result.formatted_report.title}</h4>
                <p className="text-white/80">{result.formatted_report.summary}</p>
                {result.formatted_report.sections.map((section, idx) => (
                  <div key={idx}>
                    <h5 className="font-semibold text-white/90">{section.heading}</h5>
                    <p className="text-white/70 whitespace-pre-wrap">{section.content}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Schedule Consultation</h3>
                </div>
                <p className="text-white/70 mb-4">
                  Book an appointment with a healthcare provider for professional evaluation.
                </p>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link to="/appointments">Book Appointment</Link>
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
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link to="/medications">View Guide</Link>
                </Button>
              </Card>
            </div>

            <Card className="bg-red-500/20 border-red-500/30 p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Important Disclaimer</h3>
                  <p className="text-white/80">{result.disclaimer}</p>
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
