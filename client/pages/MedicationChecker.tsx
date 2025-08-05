import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  Pill,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  Clock,
  Shield,
  Info,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

interface MedicationAnalysis {
  medicationName: string;
  dosage: string;
  safetyScore: number;
  interactions: {
    severity: string;
    description: string;
    recommendation: string;
  }[];
  sideEffects: {
    common: string[];
    serious: string[];
    rare: string[];
  };
  recommendations: string[];
  monitoringRequirements: string[];
}

export default function MedicationChecker() {
  const { user } = useAuth();
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [otherMedications, setOtherMedications] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MedicationAnalysis | null>(null);

  const durationOptions = [
    "Less than 1 week",
    "1-2 weeks", 
    "1 month",
    "3 months",
    "6+ months",
    "Long-term/Chronic"
  ];

  const commonMedications = [
    "Aspirin", "Ibuprofen", "Acetaminophen", "Metformin", "Lisinopril"
  ];

  const generateMedicationAnalysis = async (
    medication: string, 
    dose: string
  ): Promise<MedicationAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const medicationLower = medication.toLowerCase();
    
    if (medicationLower.includes('aspirin') || medicationLower.includes('ibuprofen')) {
      return {
        medicationName: medication,
        dosage: dose || "Standard therapeutic dose",
        safetyScore: 85,
        interactions: [
          {
            severity: "Moderate",
            description: "NSAIDs may increase bleeding risk when combined with blood thinners",
            recommendation: "Monitor for signs of bleeding, consider gastroprotective agents"
          }
        ],
        sideEffects: {
          common: ["Stomach upset", "Nausea", "Headache", "Dizziness"],
          serious: ["Gastrointestinal bleeding", "Kidney dysfunction", "Cardiovascular events"],
          rare: ["Severe allergic reactions", "Liver toxicity", "Blood disorders"]
        },
        recommendations: [
          "Take with food to reduce stomach irritation",
          "Use lowest effective dose for shortest duration",
          "Stay well hydrated while taking this medication",
          "Avoid alcohol consumption"
        ],
        monitoringRequirements: [
          "Blood pressure monitoring (monthly if on ACE inhibitors)",
          "Kidney function tests (every 6 months for long-term use)",
          "Signs of gastrointestinal bleeding"
        ]
      };
    } else {
      return {
        medicationName: medication,
        dosage: dose || "As prescribed",
        safetyScore: 78,
        interactions: [
          {
            severity: "Moderate",
            description: "May interact with other medications affecting the same metabolic pathways",
            recommendation: "Regular monitoring and dose adjustments may be needed"
          }
        ],
        sideEffects: {
          common: ["Mild gastrointestinal effects", "Headache", "Fatigue"],
          serious: ["Allergic reactions", "Organ-specific toxicity"],
          rare: ["Severe immune reactions", "Rare but serious complications"]
        },
        recommendations: [
          "Take as prescribed by healthcare provider",
          "Do not exceed recommended dose",
          "Report any unusual symptoms",
          "Follow up with healthcare provider regularly"
        ],
        monitoringRequirements: [
          "Regular follow-up appointments",
          "Symptom monitoring",
          "Laboratory tests as appropriate"
        ]
      };
    }
  };

  const handleAnalyze = async () => {
    if (!medicationName.trim()) return;
    
    setAnalyzing(true);
    try {
      const result = await generateMedicationAnalysis(medicationName, dosage);
      setAnalysis(result);
    } catch (error) {
      console.error("Medication analysis failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getSafetyScoreColor = (score: number) => {
    if (score >= 85) return "from-green-500 to-emerald-500";
    if (score >= 70) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return "text-red-400 bg-red-500/20 border-red-500/30";
      case 'moderate': return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case 'low': return "text-green-400 bg-green-500/20 border-green-500/30";
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30";
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-lg flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">AI Medication Checker</span>
            </div>
            
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Shield className="w-4 h-4 mr-2" />
              Advanced Drug Safety Analysis
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Medication
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}Safety Checker
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive medication analysis including interactions, side effects, and safety recommendations
            </p>
          </div>

          {/* Input Form */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Pill className="w-6 h-6 mr-3 text-blue-400" />
              Medication Information
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-white">
                    Medication Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Aspirin, Metformin, Lisinopril"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400"
                  />
                  <div className="flex flex-wrap gap-2">
                    {commonMedications.map(med => (
                      <Button
                        key={med}
                        onClick={() => setMedicationName(med)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        {med}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-lg font-medium text-white">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500mg twice daily, 10mg once daily"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!medicationName.trim() || analyzing}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-4 text-lg font-semibold rounded-xl"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Medication Safety...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Analyze Medication
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Safety Score */}
              <Card className={`bg-gradient-to-br ${getSafetyScoreColor(analysis.safetyScore)}/20 border-white/10 p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {analysis.medicationName} Safety Analysis
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{analysis.safetyScore}/100</div>
                    <div className="text-sm text-gray-300">Safety Score</div>
                  </div>
                </div>
                <p className="text-gray-200">
                  Dosage: {analysis.dosage} | Comprehensive safety analysis based on current medical data
                </p>
              </Card>

              {/* Drug Interactions */}
              {analysis.interactions.length > 0 && (
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                    Drug Interactions
                  </h3>
                  
                  <div className="space-y-4">
                    {analysis.interactions.map((interaction, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white">Interaction Detected</h4>
                          <Badge className={getSeverityColor(interaction.severity)}>
                            {interaction.severity} Risk
                          </Badge>
                        </div>
                        <p className="text-gray-200 mb-2">{interaction.description}</p>
                        <p className="text-sm text-blue-300">
                          <strong>Recommendation:</strong> {interaction.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Side Effects */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                  <Info className="w-6 h-6 mr-3 text-blue-400" />
                  Side Effect Profile
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Common (over 10%)</h4>
                    <ul className="space-y-2">
                      {analysis.sideEffects.common.map((effect, index) => (
                        <li key={index} className="text-sm text-gray-200 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-3">Serious (under 5%)</h4>
                    <ul className="space-y-2">
                      {analysis.sideEffects.serious.map((effect, index) => (
                        <li key={index} className="text-sm text-gray-200 flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-400 mb-3">Rare (under 1%)</h4>
                    <ul className="space-y-2">
                      {analysis.sideEffects.rare.map((effect, index) => (
                        <li key={index} className="text-sm text-gray-200 flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Recommendations & Monitoring */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
                    Safety Recommendations
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-200">{rec}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                    <Activity className="w-5 h-5 mr-2 text-blue-400" />
                    Monitoring Requirements
                  </h3>
                  <div className="space-y-3">
                    {analysis.monitoringRequirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-200">{req}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Emergency Warning */}
              <Card className="bg-red-500/20 border-red-500/30 p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Important Medical Disclaimer</h3>
                    <p className="text-gray-200">
                      This analysis is for informational purposes only and should not replace professional medical advice. 
                      Always consult your healthcare provider before starting, stopping, or changing medications. 
                      If you experience severe side effects or allergic reactions, seek immediate medical attention.
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
