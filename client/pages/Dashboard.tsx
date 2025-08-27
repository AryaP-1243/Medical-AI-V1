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
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Target,
  Pill,
  Thermometer,
  Wind,
  Droplet
} from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardDataResponse, VitalSign, Prescription, RecentActivity, HealthGoal } from "@shared/api";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('medassist_token');
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data.');
      }
      const dashboardData: DashboardDataResponse = await response.json();
      setData(dashboardData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getVitalIcon = (name: VitalSign['name']) => {
    switch(name) {
      case 'Heart Rate': return <Heart className="w-6 h-6 text-red-400" />;
      case 'Blood Pressure': return <Droplet className="w-6 h-6 text-orange-400" />;
      case 'Temperature': return <Thermometer className="w-6 h-6 text-blue-400" />;
      case 'Blood Oxygen': return <Wind className="w-6 h-6 text-cyan-400" />;
      default: return <Activity className="w-6 h-6 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <p className="mt-4 text-xl text-red-400">Error: {error}</p>
        <Button onClick={fetchData} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (!data) {
    return null; // Should not happen if not loading and no error, but good practice
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <nav className="border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-white" />
              <span className="text-xl font-semibold">Health Dashboard</span>
            </div>
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome back, <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{data.user.name}</span>
            </h1>
            <p className="text-xl text-white/60">Here is your AI-powered health overview.</p>
          </div>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <Badge className={cn("mb-2 border", data.health_score.trend === 'up' ? 'bg-green-500/15 text-green-300 border-green-500/25' : 'bg-red-500/15 text-red-300 border-red-500/25')}>
                  {getTrendIcon(data.health_score.trend)}
                  <span className="ml-1">Trend is {data.health_score.trend}</span>
                </Badge>
                <h2 className="text-3xl font-bold">Overall Health Score</h2>
              </div>
            </div>
            <div className="relative">
              <div className="text-6xl font-bold text-white mb-2">
                {data.health_score.current}
                <span className="text-3xl text-white/60">/100</span>
              </div>
              <Progress value={data.health_score.current} className="w-full max-w-md mx-auto h-3" />
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-cyan-400" />
                Vitals Monitor
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.vitals.map((vital: VitalSign) => (
                  <div key={vital.name} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-4">
                    {getVitalIcon(vital.name)}
                    <div>
                      <div className="text-sm text-white/70">{vital.name}</div>
                      <div className="text-xl font-bold">{vital.value} <span className="text-sm font-normal">{vital.unit}</span></div>
                      <div className="text-xs text-green-400">{vital.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Pill className="w-6 h-6 mr-3 text-purple-400" />
                Active Prescriptions
              </h3>
              <div className="space-y-3">
                {data.prescriptions.map((rx: Prescription) => (
                  <div key={rx.id} className="p-3 bg-white/5 rounded-lg border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{rx.name} <span className="text-sm text-white/70">{rx.dosage}</span></div>
                      <div className="text-xs text-white/50">{rx.frequency}</div>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Next dose in {rx.next_dose_in}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-orange-400" />
                Health Goals
              </h3>
              <div className="space-y-4">
                {data.health_goals.map((goal: HealthGoal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-sm text-white/70">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-blue-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {data.recent_activity.map((activity: RecentActivity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-white/70">{activity.description}</p>
                      <p className="text-xs text-white/50">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
