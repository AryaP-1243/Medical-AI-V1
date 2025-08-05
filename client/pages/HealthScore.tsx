import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  Heart,
  Activity,
  Brain,
  ArrowLeft,
  TrendingUp,
  Droplets,
  Clock,
  Utensils,
  Moon,
  Smile,
  Target,
  Trophy,
  Zap,
  Star,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

interface HealthData {
  date: string;
  sleep: number;
  water: number;
  exercise: number;
  stress: number;
  meals: string;
  mood: string;
  score: number;
}

export default function HealthScore() {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [todayData, setTodayData] = useState<Partial<HealthData>>({});
  const [currentScore, setCurrentScore] = useState(0);
  const [calculating, setCalculating] = useState(false);

  // Form state
  const [sleepHours, setSleepHours] = useState(7);
  const [waterIntake, setWaterIntake] = useState(8);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [stressLevel, setStressLevel] = useState(5);
  const [meals, setMeals] = useState("");
  const [moodRating, setMoodRating] = useState("😊 Good");

  const moodOptions = [
    "😄 Excellent",
    "😊 Good", 
    "😐 Neutral",
    "😔 Low",
    "😢 Very Low"
  ];

  const calculateHealthScore = (sleep: number, water: number, exercise: number, stress: number, mood: string) => {
    // Convert mood to numeric
    const moodValues: Record<string, number> = {
      "😄 Excellent": 5,
      "😊 Good": 4,
      "😐 Neutral": 3,
      "😔 Low": 2,
      "��� Very Low": 1
    };
    const moodNumeric = moodValues[mood] || 3;

    // Weighted scoring algorithm
    const sleepScore = Math.min(100, (sleep / 8) * 100) * 0.25;
    const waterScore = Math.min(100, (water / 8) * 100) * 0.20;
    const exerciseScore = Math.min(100, (exercise / 30) * 100) * 0.20;
    const stressScore = (11 - stress) * 10 * 0.15; // Invert stress (lower is better)
    const moodScore = moodNumeric * 20 * 0.20;

    const totalScore = Math.round(sleepScore + waterScore + exerciseScore + stressScore + moodScore);
    return Math.min(100, Math.max(0, totalScore));
  };

  const handleCalculateScore = async () => {
    setCalculating(true);
    
    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const score = calculateHealthScore(sleepHours, waterIntake, exerciseMinutes, stressLevel, moodRating);
    
    const newEntry: HealthData = {
      date: new Date().toISOString().split('T')[0],
      sleep: sleepHours,
      water: waterIntake,
      exercise: exerciseMinutes,
      stress: stressLevel,
      meals,
      mood: moodRating,
      score
    };

    setHealthData(prev => [...prev.filter(d => d.date !== newEntry.date), newEntry]);
    setCurrentScore(score);
    setCalculating(false);

    // Celebration effects
    if (score >= 80) {
      // Trigger confetti animation
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎉';
        confetti.style.position = 'fixed';
        confetti.style.top = '20%';
        confetti.style.left = '50%';
        confetti.style.fontSize = '3rem';
        confetti.style.zIndex = '9999';
        confetti.style.animation = 'bounce 2s ease-in-out';
        document.body.appendChild(confetti);
        setTimeout(() => document.body.removeChild(confetti), 2000);
      }, 500);
    }
  };

  const getScoreCategory = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "from-green-500 to-emerald-500", textColor: "text-green-400" };
    if (score >= 80) return { label: "Great", color: "from-blue-500 to-cyan-500", textColor: "text-blue-400" };
    if (score >= 70) return { label: "Good", color: "from-yellow-500 to-orange-500", textColor: "text-yellow-400" };
    if (score >= 60) return { label: "Fair", color: "from-orange-500 to-red-500", textColor: "text-orange-400" };
    return { label: "Needs Improvement", color: "from-red-500 to-pink-500", textColor: "text-red-400" };
  };

  const getPersonalizedAdvice = () => {
    const advice: string[] = [];
    
    if (sleepHours < 7) {
      advice.push("🛏️ Aim for 7-9 hours of sleep for optimal recovery and mental clarity");
    }
    if (waterIntake < 8) {
      advice.push("💧 Increase water intake to improve hydration and boost energy levels");
    }
    if (exerciseMinutes < 30) {
      advice.push("🏃‍♂️ Add more physical activity - even a 10-minute walk makes a difference");
    }
    if (stressLevel > 6) {
      advice.push("🧘‍♀️ Practice stress management techniques like deep breathing or meditation");
    }
    if (!meals.trim()) {
      advice.push("🥗 Track your meals to ensure balanced nutrition throughout the day");
    }

    if (advice.length === 0) {
      advice.push("🌟 Great job! Keep maintaining these healthy habits for optimal wellness");
    }

    return advice;
  };

  const getStreakCount = () => {
    return healthData.filter(d => d.score >= 70).length;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className="border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-secondary hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-primary">Health Score Engine</span>
            </div>
            
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Wellness Tracking
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Dynamic Health
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}Score Engine
              </span>
            </h1>
            
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Track your daily wellness metrics and get personalized insights to optimize your health journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-2">
              <Card className="glass border-glass-border p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-red-400" />
                  Today's Health Input
                </h2>

                <div className="space-y-6">
                  {/* Sleep */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-lg font-medium">
                        <Moon className="w-5 h-5 mr-2 text-purple-400" />
                        Sleep Hours
                      </label>
                      <span className="text-2xl font-bold text-primary">{sleepHours}h</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="0.5"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(Number(e.target.value))}
                      className="w-full h-2 glass rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>0h</span>
                      <span>12h</span>
                    </div>
                  </div>

                  {/* Water */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-lg font-medium">
                        <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                        Water Intake
                      </label>
                      <span className="text-2xl font-bold text-primary">{waterIntake} glasses</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={waterIntake}
                      onChange={(e) => setWaterIntake(Number(e.target.value))}
                      className="w-full h-2 glass rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>0</span>
                      <span>15</span>
                    </div>
                  </div>

                  {/* Exercise */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-lg font-medium">
                        <Activity className="w-5 h-5 mr-2 text-green-400" />
                        Exercise Minutes
                      </label>
                      <span className="text-2xl font-bold text-primary">{exerciseMinutes}min</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="180"
                      value={exerciseMinutes}
                      onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                      className="w-full h-2 glass rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>0min</span>
                      <span>180min</span>
                    </div>
                  </div>

                  {/* Stress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-lg font-medium">
                        <Brain className="w-5 h-5 mr-2 text-yellow-400" />
                        Stress Level
                      </label>
                      <span className="text-2xl font-bold text-primary">{stressLevel}/10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={stressLevel}
                      onChange={(e) => setStressLevel(Number(e.target.value))}
                      className="w-full h-2 glass rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>Very Relaxed</span>
                      <span>Very Stressed</span>
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="space-y-3">
                    <label className="flex items-center text-lg font-medium">
                      <Utensils className="w-5 h-5 mr-2 text-orange-400" />
                      Today's Meals
                    </label>
                    <Textarea
                      placeholder="e.g., oatmeal breakfast, salad lunch, grilled chicken dinner"
                      value={meals}
                      onChange={(e) => setMeals(e.target.value)}
                      className="glass border-glass-border text-primary placeholder:text-muted resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Mood */}
                  <div className="space-y-3">
                    <label className="flex items-center text-lg font-medium">
                      <Smile className="w-5 h-5 mr-2 text-pink-400" />
                      Overall Mood
                    </label>
                    <select
                      value={moodRating}
                      onChange={(e) => setMoodRating(e.target.value)}
                      className="w-full glass border border-glass-border rounded-lg px-4 py-3 text-primary"
                    >
                      {moodOptions.map(mood => (
                        <option key={mood} value={mood} className="bg-gray-900">
                          {mood}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={handleCalculateScore}
                    disabled={calculating}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg font-semibold rounded-xl"
                  >
                    {calculating ? (
                      <>
                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                        Calculating Health Score...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Calculate Health Score
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Score Display & Stats */}
            <div className="space-y-6">
              {/* Current Score */}
              {currentScore > 0 && (
                <Card className={`bg-gradient-to-br ${getScoreCategory(currentScore).color}/20 border-white/10 p-6 text-center`}>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getScoreCategory(currentScore).color} rounded-full flex items-center justify-center`}>
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${getScoreCategory(currentScore).textColor} bg-white/10 border-white/20`}>
                      {getScoreCategory(currentScore).label}
                    </Badge>
                  </div>
                  
                  <div className="text-4xl font-bold text-accent mb-2">
                    {currentScore}
                    <span className="text-xl text-secondary">/100</span>
                  </div>
                  
                  <Progress value={currentScore} className="mb-4" />
                  
                  {currentScore >= 80 && (
                    <div className="text-green-400 font-semibold flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      Excellent work!
                    </div>
                  )}
                </Card>
              )}

              {/* Stats */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Your Progress
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">High Score Days</span>
                    <span className="text-2xl font-bold text-primary">{getStreakCount()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-secondary">Total Entries</span>
                    <span className="text-2xl font-bold text-primary">{healthData.length}</span>
                  </div>
                  
                  {healthData.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-secondary">Average Score</span>
                      <span className="text-2xl font-bold text-primary">
                        {Math.round(healthData.reduce((sum, d) => sum + d.score, 0) / healthData.length)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Personalized Advice */}
              {currentScore > 0 && (
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Personalized Advice
                  </h3>
                  
                  <div className="space-y-3">
                    {getPersonalizedAdvice().map((advice, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-secondary">{advice}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Recent Scores Trend */}
          {healthData.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mt-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                Health Score Trend
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
                {healthData.slice(-7).map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-secondary mb-2">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className={`w-full h-20 bg-gradient-to-t ${getScoreCategory(data.score).color} rounded-lg flex items-end justify-center pb-2`}>
                      <span className="text-white font-bold">{data.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Add custom CSS for sliders
const style = document.createElement('style');
style.textContent = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3b82f6, #06b6d4);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }
  
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3b82f6, #06b6d4);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }
`;
document.head.appendChild(style);
