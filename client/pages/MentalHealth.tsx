import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  Brain,
  Heart,
  ArrowLeft,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Smile,
  Frown,
  Meh,
  Sun,
  Moon,
  Coffee,
  Music,
  Users,
  Sparkles,
  Clock,
  Star,
  Headphones,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

interface MeditationSession {
  id: string;
  type: string;
  duration: string;
  description: string;
  script: string[];
}

export default function MentalHealth() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("mood");
  const [moodDescription, setMoodDescription] = useState("");
  const [moodTriggers, setMoodTriggers] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [analyzing, setAnalyzing] = useState(false);
  const [moodAnalysis, setMoodAnalysis] = useState<any>(null);
  
  // Meditation state
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [meditationTimer, setMeditationTimer] = useState(0);

  const triggerOptions = [
    "Work stress",
    "Relationship issues", 
    "Health concerns",
    "Financial worries",
    "Family problems",
    "Sleep issues",
    "Social anxiety",
    "Other"
  ];

  const meditationTypes = [
    {
      id: "stress-relief",
      type: "Stress Relief",
      duration: "10 minutes",
      description: "Release tension and find calm in your busy day",
      icon: "🌿",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "anxiety-management",
      type: "Anxiety Management", 
      duration: "15 minutes",
      description: "Ground yourself and ease anxious thoughts",
      icon: "🦋",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "better-sleep",
      type: "Better Sleep",
      duration: "20 minutes", 
      description: "Prepare your mind and body for restful sleep",
      icon: "🌙",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "focus-enhancement",
      type: "Focus Enhancement",
      duration: "12 minutes",
      description: "Sharpen concentration and mental clarity",
      icon: "🎯", 
      color: "from-orange-500 to-red-500"
    },
    {
      id: "mindfulness",
      type: "Mindfulness",
      duration: "8 minutes",
      description: "Cultivate present-moment awareness",
      icon: "🧘‍♀️",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const wellnessTips = {
    "General Wellness": [
      "🌅 Start your day with 5 minutes of gratitude journaling",
      "🚶‍♀️ Take a 10-minute walk outdoors to boost mood and energy",
      "💧 Stay hydrated - aim for 8 glasses of water daily",
      "📱 Practice digital detox for 1 hour before bedtime",
      "🤝 Connect with a friend or family member today"
    ],
    "Stress Management": [
      "🌬️ Practice the 4-7-8 breathing technique when feeling overwhelmed",
      "📝 Write down 3 things you're grateful for each morning",
      "🛁 Take a warm bath with Epsom salts to relax muscles",
      "🎵 Listen to calming music or nature sounds for 15 minutes",
      "🧘‍♂️ Try progressive muscle relaxation before important events"
    ],
    "Better Sleep": [
      "🌙 Keep your bedroom cool (65-68°F) for optimal sleep",
      "📵 Avoid screens 1 hour before bedtime",
      "☕ Limit caffeine after 2 PM to prevent sleep disruption",
      "📖 Read a book or practice gentle stretching before bed",
      "⏰ Maintain consistent sleep and wake times, even on weekends"
    ],
    "Productivity": [
      "🍅 Use the Pomodoro Technique: 25 minutes focused work, 5-minute break",
      "📋 Prioritize your top 3 most important tasks each morning",
      "🧹 Declutter your workspace to improve mental clarity",
      "🎯 Break large projects into smaller, actionable steps",
      "⚡ Schedule your most challenging tasks during peak energy hours"
    ],
    "Healthy Eating": [
      "🥗 Fill half your plate with colorful vegetables at each meal",
      "🍎 Prep healthy snacks in advance to avoid processed options",
      "�� Include omega-3 rich foods like salmon, walnuts, or chia seeds",
      "🥤 Replace one sugary drink with herbal tea or infused water",
      "🍽️ Practice mindful eating by putting your fork down between bites"
    ],
    "Exercise Motivation": [
      "🏃‍♀️ Start with just 10 minutes of movement - consistency beats intensity",
      "📱 Find a workout buddy or join online fitness communities",
      "🎵 Create an energizing playlist to make exercise more enjoyable",
      "🏆 Reward yourself with non-food treats for reaching fitness goals",
      "🚴‍♂️ Try different activities weekly to prevent boredom"
    ],
    "Social Connection": [
      "📞 Schedule regular check-ins with friends and family",
      "🤝 Join clubs or groups based on your interests or hobbies",
      "💌 Send a thoughtful message to someone you care about",
      "🎉 Organize small gatherings or activities with loved ones",
      "🤲 Volunteer for causes you're passionate about"
    ]
  };

  const handleMoodAnalysis = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const analysis = {
      emotion: anxietyLevel > 7 ? "high anxiety" : energyLevel < 4 ? "low energy" : moodTriggers.includes("Work stress") ? "work-related stress" : "balanced",
      recommendations: [
        "Practice deep breathing exercises for 5 minutes",
        "Take short breaks every hour to prevent overwhelm",
        "Consider talking to a trusted friend or counselor",
        "Engage in a hobby you enjoy to shift focus"
      ],
      techniques: [
        {
          name: "Box Breathing",
          description: "Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat 4 times."
        },
        {
          name: "Grounding Exercise", 
          description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste."
        }
      ],
      affirmations: [
        "I am capable of handling whatever comes my way",
        "This feeling is temporary and will pass",
        "I choose to focus on what I can control",
        "I am worthy of peace and happiness"
      ]
    };
    
    setMoodAnalysis(analysis);
    setAnalyzing(false);
  };

  const startMeditation = (type: any) => {
    const scripts = {
      "stress-relief": [
        "Find a comfortable position and close your eyes gently",
        "Take three deep breaths, allowing your body to relax with each exhale",
        "Notice any areas of tension in your body, starting from your head",
        "Breathe into these tense areas and imagine them softening",
        "Continue breathing slowly and deeply, letting go of the day's stress",
        "Visualize a peaceful place where you feel completely safe and calm",
        "Stay in this peaceful space, breathing naturally",
        "When ready, slowly open your eyes and return to the present moment"
      ],
      "anxiety-management": [
        "Sit comfortably with your feet flat on the ground",
        "Place one hand on your chest, one on your belly",
        "Breathe slowly, focusing on the hand on your belly rising",
        "Count your breaths: in for 4, hold for 4, out for 6",
        "If anxious thoughts arise, acknowledge them without judgment",
        "Return your attention gently to your breath",
        "Feel your body becoming more grounded with each breath",
        "Know that you are safe in this moment"
      ],
      "better-sleep": [
        "Lie down comfortably and close your eyes",
        "Take slow, deep breaths, allowing your body to sink into the bed",
        "Starting with your toes, tense and then completely relax each muscle group",
        "Move up through your legs, torso, arms, and face",
        "Imagine a warm, golden light washing over your entire body",
        "Let this light dissolve any remaining tension or worry",
        "Your mind is becoming quiet and peaceful",
        "Allow yourself to drift into restful, restorative sleep"
      ],
      "focus-enhancement": [
        "Sit upright with your spine straight but not rigid",
        "Choose a single point of focus - your breath, a word, or visualization",
        "When your mind wanders, gently guide it back to your chosen focus",
        "Notice how your mind becomes clearer with each return to focus",
        "Breathe with intention, feeling more alert and centered",
        "Visualize your mind as a calm, clear lake",
        "Set an intention for focused, productive energy",
        "Open your eyes feeling refreshed and mentally sharp"
      ],
      "mindfulness": [
        "Begin by simply noticing that you are breathing",
        "Don't try to change your breath, just observe it",
        "Notice the sensations of breathing in and breathing out",
        "When thoughts arise, acknowledge them and return to your breath",
        "Expand your awareness to include sounds around you",
        "Notice any physical sensations without trying to change them",
        "Practice accepting this moment exactly as it is",
        "Rest in this awareness of the present moment"
      ]
    };

    const session: MeditationSession = {
      id: type.id,
      type: type.type,
      duration: type.duration,
      description: type.description,
      script: scripts[type.id as keyof typeof scripts] || scripts["mindfulness"]
    };

    setSelectedMeditation(session);
    setCurrentStep(0);
    setIsPlaying(true);
    setMeditationTimer(0);
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">Mental Health Assistant</span>
            </div>
            
            <AuthNav variant="app" />
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Heart className="w-4 h-4 mr-2" />
              Mental Wellness & Mindfulness
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Mental Health
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}& Wellness Assistant
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Share your feelings and get personalized mental wellness support, guided meditations, and daily wellness tips
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "mood", label: "💭 Mood Check-in", icon: Smile },
              { id: "meditation", label: "🧘 Meditation", icon: Brain },
              { id: "wellness", label: "🌟 Wellness Tips", icon: Lightbulb }
            ].map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`px-6 py-3 rounded-xl ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Mood Check-in Tab */}
          {activeTab === "mood" && (
            <div className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-pink-400" />
                  How are you feeling today?
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Describe your mood and thoughts
                    </label>
                    <Textarea
                      placeholder="Describe your mood, thoughts, or any concerns you're having..."
                      value={moodDescription}
                      onChange={(e) => setMoodDescription(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium mb-3">
                      What's affecting your mood?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {triggerOptions.map(trigger => (
                        <Button
                          key={trigger}
                          onClick={() => {
                            if (moodTriggers.includes(trigger)) {
                              setMoodTriggers(prev => prev.filter(t => t !== trigger));
                            } else {
                              setMoodTriggers(prev => [...prev, trigger]);
                            }
                          }}
                          variant={moodTriggers.includes(trigger) ? "default" : "ghost"}
                          className={`text-sm ${
                            moodTriggers.includes(trigger)
                              ? "bg-purple-500 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {trigger}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-lg font-medium">Energy Level</label>
                        <span className="text-2xl font-bold">{energyLevel}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={energyLevel}
                        onChange={(e) => setEnergyLevel(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-lg font-medium">Anxiety Level</label>
                        <span className="text-2xl font-bold">{anxietyLevel}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={anxietyLevel}
                        onChange={(e) => setAnxietyLevel(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleMoodAnalysis}
                    disabled={!moodDescription.trim() || analyzing}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 text-lg font-semibold rounded-xl"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing your emotional state...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze Mood
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Mood Analysis Results */}
              {moodAnalysis && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {moodAnalysis.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                      Daily Affirmations
                    </h3>
                    <div className="space-y-3">
                      {moodAnalysis.affirmations.map((affirmation: string, index: number) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                          <span className="text-sm italic">"{affirmation}"</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Meditation Tab */}
          {activeTab === "meditation" && (
            <div className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Headphones className="w-6 h-6 mr-3 text-blue-400" />
                  Guided Meditation & Relaxation
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meditationTypes.map(meditation => (
                    <Card key={meditation.id} className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                          onClick={() => startMeditation(meditation)}>
                      <div className={`w-16 h-16 bg-gradient-to-r ${meditation.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                        {meditation.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{meditation.type}</h3>
                      <p className="text-white/70 text-sm mb-3">{meditation.description}</p>
                      <Badge className="bg-white/10 text-white/80 border-white/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {meditation.duration}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Active Meditation Session */}
              {selectedMeditation && (
                <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{selectedMeditation.type}</h3>
                    <p className="text-white/70">{selectedMeditation.description}</p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <div className="text-lg p-6 bg-white/10 rounded-xl border border-white/20">
                        {selectedMeditation.script[currentStep] || "Meditation complete. Take a moment to notice how you feel."}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 mb-4">
                      <Button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>

                      <Button
                        onClick={() => setCurrentStep(Math.min(selectedMeditation.script.length, currentStep + 1))}
                        disabled={currentStep >= selectedMeditation.script.length}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Next
                        <RotateCcw className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    </div>

                    <div className="text-center text-sm text-white/60">
                      Step {currentStep + 1} of {selectedMeditation.script.length}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Wellness Tips Tab */}
          {activeTab === "wellness" && (
            <div className="space-y-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
                  Daily Wellness Tips
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(wellnessTips).map(([category, tips]) => (
                    <Card key={category} className="bg-white/5 border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {tips.slice(0, 3).map((tip, index) => (
                          <div key={index} className="text-sm text-white/80 p-3 bg-white/5 rounded-lg">
                            {tip}
                          </div>
                        ))}
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
