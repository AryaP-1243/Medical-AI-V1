import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  TrendingDown,
  Minus,
  Calendar,
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Zap,
  Moon,
  Utensils,
  Dumbbell,
  Smile
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("7d");
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    // Animate health score on load
    setTimeout(() => setHealthScore(78), 500);
  }, []);

  const metrics = [
    {
      icon: Moon,
      label: "Sleep",
      value: "7.2",
      unit: "hrs",
      trend: "+0.3",
      color: "from-purple-500 to-pink-500",
      progress: 72
    },
    {
      icon: Utensils,
      label: "Nutrition",
      value: "8.1",
      unit: "/10",
      trend: "+0.5",
      color: "from-green-500 to-emerald-500",
      progress: 81
    },
    {
      icon: Dumbbell,
      label: "Exercise",
      value: "4.2",
      unit: "days",
      trend: "-0.2",
      color: "from-blue-500 to-cyan-500",
      progress: 60
    },
    {
      icon: Smile,
      label: "Mood",
      value: "7.8",
      unit: "/10",
      trend: "+0.7",
      color: "from-yellow-500 to-orange-500",
      progress: 78
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Sleep Pattern Irregularity",
      message: "Your sleep schedule has been inconsistent this week",
      time: "2 hours ago"
    },
    {
      type: "success",
      title: "Exercise Goal Achieved",
      message: "Great job! You've reached your weekly exercise target",
      time: "1 day ago"
    }
  ];

  const insights = [
    {
      title: "Optimal Sleep Window",
      description: "Your body performs best with 7-8 hours of sleep between 10 PM - 6 AM",
      impact: "High"
    },
    {
      title: "Nutrition Timing",
      description: "Consider eating your largest meal earlier in the day for better metabolism",
      impact: "Medium"
    },
    {
      title: "Stress Management",
      description: "Try 10 minutes of meditation during your afternoon energy dip",
      impact: "High"
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend.startsWith('+')) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend.startsWith('-')) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-muted" />;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-blue-400" />;
    }
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
            <span className="text-xl font-semibold text-primary">Health Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="glass border border-glass-border rounded-lg px-3 py-1 text-sm text-primary"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
            <AuthNav variant="app" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Your Health
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Overview
            </span>
          </h1>
          <p className="text-xl text-secondary">
            AI-powered insights to optimize your wellness journey
          </p>
        </div>

        {/* Health Score */}
        <Card className="glass-strong bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <Badge className="bg-green-500/15 text-green-300 border-green-500/25 mb-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                Improving
              </Badge>
              <h2 className="text-3xl font-bold text-primary">Overall Health Score</h2>
            </div>
          </div>
          
          <div className="relative">
            <div className="text-6xl font-bold text-accent mb-2">
              {healthScore}
              <span className="text-3xl text-secondary">/100</span>
            </div>
            <Progress value={healthScore} className="w-full max-w-md mx-auto h-3" />
            <p className="text-secondary mt-4">
              You're in the <span className="text-green-300 font-semibold">Good</span> range.
              Keep up the great work!
            </p>
          </div>
        </Card>

        {/* Medical Services Grid */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-6">⚡ Advanced Medical Services</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/symptom-analyzer" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🩺</div>
                  <h3 className="font-semibold text-primary mb-2">AI Symptom Analyzer</h3>
                  <p className="text-sm text-secondary">Advanced medical AI with differential diagnosis</p>
                </div>
              </Card>
            </Link>

            <Link to="/enhanced-chat" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-semibold text-primary mb-2">MedAssist AI Chat</h3>
                  <p className="text-sm text-secondary">Comprehensive AI medical consultation</p>
                </div>
              </Card>
            </Link>

            <Link to="/health-score" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-semibold text-primary mb-2">Health Score Engine</h3>
                  <p className="text-sm text-secondary">Dynamic wellness tracking & scoring</p>
                </div>
              </Card>
            </Link>

            <Link to="/mental-health" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🧠</div>
                  <h3 className="font-semibold text-primary mb-2">Mental Health Assistant</h3>
                  <p className="text-sm text-secondary">Mood analysis & meditation support</p>
                </div>
              </Card>
            </Link>

            <Link to="/food-analyzer" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🧪</div>
                  <h3 className="font-semibold text-primary mb-2">Food & Nutrition Analyzer</h3>
                  <p className="text-sm text-secondary">AI-powered nutritional analysis</p>
                </div>
              </Card>
            </Link>

            <Link to="/medications" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">💊</div>
                  <h3 className="font-semibold text-primary mb-2">Medication Checker</h3>
                  <p className="text-sm text-secondary">Drug interactions & safety analysis</p>
                </div>
              </Card>
            </Link>

            <Link to="/enhanced-chat" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold text-primary mb-2">Medical Research</h3>
                  <p className="text-sm text-secondary">Evidence-based research assistant</p>
                </div>
              </Card>
            </Link>

            <Link to="/gamification" className="group">
              <Card className="glass border-glass-border p-6 hover:bg-glass-strong-bg transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="text-3xl mb-3">🎮</div>
                  <h3 className="font-semibold text-primary mb-2">Health Gamification</h3>
                  <p className="text-sm text-secondary">Challenges & achievements system</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="glass border-glass-border p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm ${
                    metric.trend.startsWith('+') ? 'text-green-400' : 
                    metric.trend.startsWith('-') ? 'text-red-400' : 'text-muted'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold">{metric.label}</h3>
                  <div className="text-2xl font-bold">
                    {metric.value}
                    <span className="text-sm text-tertiary ml-1">{metric.unit}</span>
                  </div>
                </div>
                
                <Progress value={metric.progress} className="h-2" />
              </div>
            </Card>
          ))}
        </div>

        {/* Alerts & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Alerts */}
          <Card className="glass border-glass-border p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-yellow-400" />
              Recent Alerts
            </h3>
            
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{alert.title}</h4>
                      <p className="text-secondary text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="glass border-glass-border p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-blue-400" />
              AI Insights
            </h3>
            
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge className={`text-xs ${
                      insight.impact === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-secondary text-sm">{insight.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-6 text-center">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Set New Goals</h3>
            <p className="text-secondary mb-4">Define and track your health objectives</p>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Create Goals
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6 text-center">
            <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Schedule Check-up</h3>
            <p className="text-secondary mb-4">Book your next medical appointment</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Book Now
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 p-6 text-center">
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">View Achievements</h3>
            <p className="text-secondary mb-4">Celebrate your health milestones</p>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              See Progress
            </Button>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="glass border-glass-border p-6">
          <h3 className="text-2xl font-semibold mb-6">This Week's Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Steps Taken", value: "52,847", change: "+12%" },
              { label: "Calories Burned", value: "2,340", change: "+8%" },
              { label: "Water Intake", value: "1.8L", change: "-5%" },
              { label: "Screen Time", value: "6.2h", change: "-15%" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-secondary mb-1">{stat.label}</div>
                <div className={`text-xs ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change} vs last week
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      </div>
    </ProtectedRoute>
  );
}
