import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  Apple,
  Brain,
  ArrowLeft,
  Loader2,
  ChefHat,
  Utensils,
  Droplets,
  Zap,
  Heart,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Scale,
  Camera,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

interface NutritionAnalysis {
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  micronutrients: string[];
  healthScore: number;
  recommendations: string[];
  alternatives: string[];
  warnings: string[];
}

export default function FoodAnalyzer() {
  const { user } = useAuth();
  const [mealDescription, setMealDescription] = useState("");
  const [mealType, setMealType] = useState("Lunch");
  const [portionSize, setPortionSize] = useState("Medium");
  const [dietaryGoals, setDietaryGoals] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState("Moderately Active");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const goalOptions = [
    "Weight Loss",
    "Muscle Gain", 
    "Heart Health",
    "Diabetes Management",
    "Lower Cholesterol",
    "Better Energy",
    "Digestive Health",
    "Athletic Performance"
  ];

  const restrictionOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Low-Sodium", 
    "Low-Sugar",
    "Paleo"
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const portionSizes = ["Small", "Medium", "Large", "Extra Large"];
  const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Simulate AI nutritional analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock analysis based on input
    const mockAnalysis: NutritionAnalysis = {
      calories: portionSize === "Small" ? 350 : portionSize === "Large" ? 650 : 500,
      macros: {
        protein: 25,
        carbs: 45,
        fat: 18,
        fiber: 8
      },
      micronutrients: [
        "Vitamin C (120% DV)",
        "Vitamin K (95% DV)", 
        "Folate (80% DV)",
        "Iron (45% DV)",
        "Magnesium (35% DV)"
      ],
      healthScore: dietaryRestrictions.length > 0 ? 85 : 75,
      recommendations: [
        "Add a source of healthy fats like avocado or nuts",
        "Include more colorful vegetables to boost antioxidants",
        "Consider reducing sodium content",
        "Pair with a glass of water for better hydration"
      ],
      alternatives: [
        "Quinoa salad with grilled salmon and mixed vegetables",
        "Lentil soup with whole grain bread and side salad",
        "Chicken stir-fry with brown rice and steamed broccoli"
      ],
      warnings: []
    };

    // Add warnings based on dietary goals/restrictions
    if (dietaryGoals.includes("Weight Loss") && mockAnalysis.calories > 600) {
      mockAnalysis.warnings.push("High calorie content may not align with weight loss goals");
    }
    if (dietaryGoals.includes("Diabetes Management") && mockAnalysis.macros.carbs > 50) {
      mockAnalysis.warnings.push("High carbohydrate content - monitor blood sugar carefully");
    }

    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
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
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">AI Food Analyzer</span>
            </div>
            
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              <ChefHat className="w-4 h-4 mr-2" />
              AI-Powered Nutrition Intelligence
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Food Analyzer
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}& Nutrition Engine
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Analyze your meals and get personalized nutrition guidance with AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Utensils className="w-6 h-6 mr-3 text-green-400" />
                  Describe Your Meal
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      What did you eat?
                    </label>
                    <Textarea
                      placeholder="e.g., grilled chicken breast, quinoa salad, steamed broccoli, olive oil dressing"
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px] resize-none"
                    />
                    <div className="flex gap-2 mt-3">
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Search Foods
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/70">Meal Type</label>
                      <select 
                        value={mealType}
                        onChange={(e) => setMealType(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        {mealTypes.map(type => (
                          <option key={type} value={type} className="bg-gray-900">{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/70">Portion Size</label>
                      <select
                        value={portionSize}
                        onChange={(e) => setPortionSize(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        {portionSizes.map(size => (
                          <option key={size} value={size} className="bg-gray-900">{size}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/70">Activity Level</label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        {activityLevels.map(level => (
                          <option key={level} value={level} className="bg-gray-900">{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3">Your Dietary Goals</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {goalOptions.map(goal => (
                        <Button
                          key={goal}
                          onClick={() => {
                            if (dietaryGoals.includes(goal)) {
                              setDietaryGoals(prev => prev.filter(g => g !== goal));
                            } else {
                              setDietaryGoals(prev => [...prev, goal]);
                            }
                          }}
                          variant={dietaryGoals.includes(goal) ? "default" : "ghost"}
                          className={`text-sm ${
                            dietaryGoals.includes(goal)
                              ? "bg-green-500 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {goal}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3">Dietary Restrictions</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {restrictionOptions.map(restriction => (
                        <Button
                          key={restriction}
                          onClick={() => {
                            if (dietaryRestrictions.includes(restriction)) {
                              setDietaryRestrictions(prev => prev.filter(r => r !== restriction));
                            } else {
                              setDietaryRestrictions(prev => [...prev, restriction]);
                            }
                          }}
                          variant={dietaryRestrictions.includes(restriction) ? "default" : "ghost"}
                          className={`text-sm ${
                            dietaryRestrictions.includes(restriction)
                              ? "bg-blue-500 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {restriction}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!mealDescription.trim() || analyzing}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-lg font-semibold rounded-xl"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Nutrition...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze Nutrition
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Daily Targets
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Calories</span>
                    <span className="text-lg font-bold">2000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Protein</span>
                    <span className="text-lg font-bold">150g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Carbs</span>
                    <span className="text-lg font-bold">200g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Fat</span>
                    <span className="text-lg font-bold">65g</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nutrition Tip
                </h4>
                <p className="text-sm text-white/80">
                  Eating a variety of colorful fruits and vegetables ensures you get a wide range of vitamins, minerals, and antioxidants.
                </p>
              </Card>
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="mt-8 space-y-6">
              {/* Health Score */}
              <Card className={`bg-gradient-to-br ${getHealthScoreColor(analysis.healthScore)}/20 border-white/10 p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <Scale className="w-6 h-6 mr-3" />
                    Nutrition Score
                  </h3>
                  <Badge className={`text-lg px-4 py-2 bg-gradient-to-r ${getHealthScoreColor(analysis.healthScore)}/30 border-white/20`}>
                    {getHealthScoreLabel(analysis.healthScore)}
                  </Badge>
                </div>
                
                <div className="text-4xl font-bold mb-2 text-center">
                  {analysis.healthScore}
                  <span className="text-xl text-white/60">/100</span>
                </div>
              </Card>

              {/* Macronutrients */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                  Nutritional Breakdown
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">{analysis.calories}</div>
                    <div className="text-sm text-white/60">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{analysis.macros.protein}g</div>
                    <div className="text-sm text-white/60">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{analysis.macros.carbs}g</div>
                    <div className="text-sm text-white/60">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{analysis.macros.fat}g</div>
                    <div className="text-sm text-white/60">Fat</div>
                  </div>
                </div>

                {/* Micronutrients */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Key Micronutrients</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {analysis.micronutrients.map((nutrient, index) => (
                      <Badge key={index} className="bg-green-500/20 text-green-400 border-green-500/30 justify-center py-2">
                        {nutrient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <Card className="bg-red-500/20 border-red-500/30 p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-red-400">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Health Considerations
                  </h3>
                  <div className="space-y-2">
                    {analysis.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-red-300">{warning}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Recommendations */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3 text-green-400" />
                  Personalized Recommendations
                </h3>
                
                <div className="grid gap-3">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90">{rec}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Healthier Alternatives */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-pink-400" />
                    Healthier Alternatives
                  </h3>
                  <Button
                    onClick={() => setShowAlternatives(!showAlternatives)}
                    variant="ghost"
                    className="text-white/70 hover:text-white"
                  >
                    {showAlternatives ? "Hide" : "Show"} Alternatives
                  </Button>
                </div>
                
                {showAlternatives && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {analysis.alternatives.map((alternative, index) => (
                      <Card key={index} className="bg-white/5 border-white/10 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <ChefHat className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">Alternative {index + 1}</span>
                        </div>
                        <p className="text-sm text-white/80">{alternative}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
