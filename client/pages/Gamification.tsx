import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  Trophy,
  Star,
  Target,
  Flame,
  Award,
  ArrowLeft,
  Zap,
  Crown,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Gift,
  Medal,
  Users,
  Sparkles,
  Heart,
  Droplets,
  Activity,
  Brain,
  Coffee,
  Gamepad2
} from "lucide-react";
import { Link } from "react-router-dom";

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Challenge {
  id: string;
  name: string;
  task: string;
  points: number;
  icon: any;
  completed: boolean;
  category: string;
}

interface UserStats {
  totalPoints: number;
  level: number;
  currentStreak: number;
  achievements: string[];
  weeklyPoints: number;
  rank: number;
}

export default function Gamification() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("challenges");
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 1250,
    level: 8,
    currentStreak: 5,
    achievements: ["🌟 First Step", "💧 Hydration Hero", "🏃 Exercise Enthusiast"],
    weeklyPoints: 340,
    rank: 2
  });

  const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>([
    {
      id: "hydration",
      name: "💧 Hydration Challenge",
      task: "Drink 8 glasses of water",
      points: 10,
      icon: Droplets,
      completed: false,
      category: "wellness"
    },
    {
      id: "exercise",
      name: "🏃 Move More",
      task: "Exercise for 30 minutes",
      points: 15,
      icon: Activity,
      completed: true,
      category: "fitness"
    },
    {
      id: "meditation",
      name: "🧘 Mindful Moment",
      task: "Complete 10-minute meditation",
      points: 12,
      icon: Brain,
      completed: false,
      category: "mental"
    },
    {
      id: "nutrition",
      name: "🥗 Healthy Eating",
      task: "Eat 5 servings of fruits/vegetables",
      points: 20,
      icon: Heart,
      completed: false,
      category: "nutrition"
    }
  ]);

  const achievements: Achievement[] = [
    {
      id: "first-step",
      name: "🌟 First Step",
      description: "Complete your first health check-in",
      points: 10,
      icon: "🌟",
      earned: true
    },
    {
      id: "hydration-hero",
      name: "💧 Hydration Hero",
      description: "Drink 8+ glasses of water for 3 days",
      points: 50,
      icon: "💧",
      earned: true
    },
    {
      id: "exercise-enthusiast",
      name: "🏃 Exercise Enthusiast",
      description: "Exercise 30+ minutes for 7 days",
      points: 100,
      icon: "🏃",
      earned: true
    },
    {
      id: "sleep-champion",
      name: "😴 Sleep Champion",
      description: "Get 7+ hours sleep for 5 days",
      points: 75,
      icon: "😴",
      earned: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: "nutrition-navigator",
      name: "🥗 Nutrition Navigator",
      description: "Log healthy meals for 10 days",
      points: 150,
      icon: "🥗",
      earned: false,
      progress: 6,
      maxProgress: 10
    },
    {
      id: "mindfulness-master",
      name: "🧘 Mindfulness Master",
      description: "Complete 5 meditation sessions",
      points: 80,
      icon: "🧘",
      earned: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: "streak-superstar",
      name: "💪 Streak Superstar",
      description: "Maintain 14-day wellness streak",
      points: 200,
      icon: "💪",
      earned: false,
      progress: 5,
      maxProgress: 14
    },
    {
      id: "health-score-hero",
      name: "🎯 Health Score Hero",
      description: "Achieve 80+ health score 5 times",
      points: 120,
      icon: "🎯",
      earned: false,
      progress: 2,
      maxProgress: 5
    }
  ];

  const leaderboard = [
    { rank: 1, username: "HealthHero2025", points: 2850, level: 29, avatar: "👨‍⚕️" },
    { rank: 2, username: user?.name || "You", points: userStats.totalPoints, level: userStats.level, avatar: "🧑‍💼", isCurrentUser: true },
    { rank: 3, username: "WellnessWarrior", points: 2400, level: 24, avatar: "🏃‍♀️" },
    { rank: 4, username: "FitnessFanatic", points: 2200, level: 22, avatar: "💪" },
    { rank: 5, username: "MindfulMover", points: 2000, level: 20, avatar: "🧘‍♀️" }
  ];

  const rewards = [
    {
      name: "📊 Advanced Analytics",
      cost: 500,
      description: "Unlock detailed health insights and trend analysis",
      category: "premium",
      available: userStats.totalPoints >= 500
    },
    {
      name: "🎨 Custom Themes",
      cost: 300,
      description: "Personalize your dashboard with custom colors",
      category: "cosmetic",
      available: userStats.totalPoints >= 300
    },
    {
      name: "📱 Mobile App Access",
      cost: 1000,
      description: "Premium mobile features and notifications",
      category: "premium",
      available: userStats.totalPoints >= 1000
    },
    {
      name: "👨‍⚕️ Doctor Consultation",
      cost: 2000,
      description: "Free 30-minute consultation with healthcare provider",
      category: "health",
      available: userStats.totalPoints >= 2000
    },
    {
      name: "🧬 DNA Health Report",
      cost: 5000,
      description: "Personalized genetic insights and recommendations",
      category: "premium",
      available: userStats.totalPoints >= 5000
    }
  ];

  const completeChallenge = (challengeId: string) => {
    setDailyChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: true }
        : challenge
    ));
    
    const challenge = dailyChallenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + challenge.points,
        weeklyPoints: prev.weeklyPoints + challenge.points
      }));
    }
  };

  const redeemReward = (rewardName: string, cost: number) => {
    if (userStats.totalPoints >= cost) {
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - cost
      }));
    }
  };

  const calculateLevelProgress = () => {
    const pointsForCurrentLevel = (userStats.level - 1) * 100;
    const pointsForNextLevel = userStats.level * 100;
    const progress = ((userStats.totalPoints - pointsForCurrentLevel) / 100) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const getCompletedChallenges = () => {
    return dailyChallenges.filter(c => c.completed).length;
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
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Health Gamification</span>
            </div>
            
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Trophy className="w-4 h-4 mr-2" />
              Gamified Health Journey
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Health
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}Gamification Center
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Level up your health journey with challenges, achievements, and rewards that make wellness fun and engaging
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">Level</span>
              </div>
              <div className="text-3xl font-bold">{userStats.level}</div>
              <Progress value={calculateLevelProgress()} className="mt-3" />
              <p className="text-xs text-white/60 mt-2">
                {100 - Math.round(calculateLevelProgress())}% to Level {userStats.level + 1}
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">Total Points</span>
              </div>
              <div className="text-3xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Achievements</span>
              </div>
              <div className="text-3xl font-bold">{achievements.filter(a => a.earned).length}</div>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-red-400" />
                <span className="text-sm text-red-400 font-medium">Streak</span>
              </div>
              <div className="text-3xl font-bold">{userStats.currentStreak} days</div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "challenges", label: "🎯 Daily Challenges", icon: Target },
              { id: "achievements", label: "🏅 Achievements", icon: Award },
              { id: "leaderboard", label: "📊 Leaderboard", icon: Users },
              { id: "rewards", label: "🎁 Rewards", icon: Gift }
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`px-6 py-3 rounded-xl ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Daily Challenges Tab */}
          {activeTab === "challenges" && (
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Target className="w-6 h-6 mr-3 text-yellow-400" />
                    Today's Wellness Challenges
                  </h2>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {getCompletedChallenges()}/{dailyChallenges.length} Completed
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dailyChallenges.map(challenge => (
                    <Card key={challenge.id} className={`p-6 transition-all duration-300 ${
                      challenge.completed 
                        ? "bg-green-500/20 border-green-500/30" 
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            challenge.completed ? "bg-green-500" : "bg-gradient-to-r from-yellow-500 to-orange-500"
                          }`}>
                            <challenge.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{challenge.name}</h3>
                            <p className="text-sm text-white/70">{challenge.task}</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          +{challenge.points} pts
                        </Badge>
                      </div>

                      <div className="flex justify-end">
                        {challenge.completed ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">Completed!</span>
                          </div>
                        ) : (
                          <Button
                            onClick={() => completeChallenge(challenge.id)}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                          >
                            Complete Challenge
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                {getCompletedChallenges() === dailyChallenges.length && (
                  <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 p-6 mt-6 text-center">
                    <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-400 mb-2">All Challenges Complete!</h3>
                    <p className="text-white/80 mb-4">Amazing work! You've completed all today's challenges. Bonus +25 points!</p>
                    <Badge className="bg-green-500/30 text-green-400 border-green-500/50 text-lg px-4 py-2">
                      <Trophy className="w-4 h-4 mr-2" />
                      Perfect Day Bonus: +25 points
                    </Badge>
                  </Card>
                )}
              </Card>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-purple-400" />
                  Achievement Gallery
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map(achievement => (
                    <Card key={achievement.id} className={`p-6 transition-all duration-300 ${
                      achievement.earned 
                        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30" 
                        : "bg-white/5 border-white/10 opacity-60"
                    }`}>
                      <div className="text-center">
                        <div className={`text-4xl mb-3 ${achievement.earned ? "" : "filter grayscale"}`}>
                          {achievement.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{achievement.name}</h3>
                        <p className="text-sm text-white/70 mb-3">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <div className="flex items-center justify-center gap-2">
                            <Medal className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">+{achievement.points} pts</span>
                          </div>
                        ) : achievement.progress !== undefined ? (
                          <div className="space-y-2">
                            <Progress value={(achievement.progress! / achievement.maxProgress!) * 100} />
                            <p className="text-xs text-white/60">
                              {achievement.progress}/{achievement.maxProgress} completed
                            </p>
                          </div>
                        ) : (
                          <Badge className="bg-white/10 text-white/60 border-white/20">
                            {achievement.points} points
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-400" />
                  Community Leaderboard
                </h2>

                <div className="space-y-4">
                  {leaderboard.map(player => (
                    <Card key={player.rank} className={`p-6 transition-all duration-300 ${
                      player.isCurrentUser 
                        ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30" 
                        : "bg-white/5 border-white/10"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                            player.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-400" :
                            player.rank === 2 ? "bg-gradient-to-r from-gray-300 to-gray-400" :
                            player.rank === 3 ? "bg-gradient-to-r from-orange-400 to-yellow-600" :
                            "bg-gradient-to-r from-gray-600 to-gray-700"
                          }`}>
                            {player.rank <= 3 ? (
                              player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"
                            ) : (
                              `#${player.rank}`
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{player.avatar}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{player.username}</span>
                                {player.isCurrentUser && (
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                    You
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-white/60">Level {player.level}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold">{player.points.toLocaleString()}</div>
                          <div className="text-sm text-white/60">points</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && (
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Gift className="w-6 h-6 mr-3 text-pink-400" />
                    Rewards & Benefits
                  </h2>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-lg px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    {userStats.totalPoints.toLocaleString()} points available
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map((reward, index) => (
                    <Card key={index} className={`p-6 transition-all duration-300 ${
                      reward.available 
                        ? "bg-white/5 border-white/10 hover:bg-white/10" 
                        : "bg-white/5 border-white/10 opacity-60"
                    }`}>
                      <div className="text-center">
                        <div className="text-3xl mb-3">{reward.name.split(' ')[0]}</div>
                        <h3 className="font-semibold mb-2">{reward.name.slice(2)}</h3>
                        <p className="text-sm text-white/70 mb-4">{reward.description}</p>
                        
                        <div className="space-y-3">
                          <Badge className={`text-lg px-4 py-2 ${
                            reward.category === "premium" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                            reward.category === "health" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                            "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }`}>
                            {reward.cost.toLocaleString()} points
                          </Badge>
                          
                          {reward.available ? (
                            <Button
                              onClick={() => redeemReward(reward.name, reward.cost)}
                              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                            >
                              Redeem Reward
                            </Button>
                          ) : (
                            <div className="text-sm text-white/60">
                              Need {(reward.cost - userStats.totalPoints).toLocaleString()} more points
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
