import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthNav from "@/components/AuthNav";
import {
  Heart,
  Brain,
  Activity,
  Shield,
  Zap,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Award,
  Stethoscope,
  MessageSquare,
  BarChart3,
  FileText,
  Calendar,
  Pill,
  Search,
  Trophy,
  Apple
} from "lucide-react";

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Health Analysis",
      description: "Advanced neuromorphic intelligence that understands your health patterns",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Heart,
      title: "Proactive Monitoring",
      description: "Continuous health surveillance with early warning detection",
      color: "from-red-500 to-pink-400"
    },
    {
      icon: Activity,
      title: "Real-time Insights",
      description: "Instant health analytics with personalized recommendations",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Shield,
      title: "Medical Grade Security",
      description: "Enterprise-level encryption protecting your health data",
      color: "from-purple-500 to-violet-400"
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: "AI Symptom Analyzer",
      description: "Advanced medical AI with differential diagnosis and evidence-based recommendations",
      href: "/symptom-analyzer",
      color: "from-red-500 to-pink-500",
      badge: "Core"
    },
    {
      icon: MessageSquare,
      title: "Enhanced Medical AI Chat",
      description: "Comprehensive AI medical assistant with specialized analysis modes",
      href: "/enhanced-chat",
      color: "from-blue-500 to-cyan-500",
      badge: "Enhanced"
    },
    {
      icon: BarChart3,
      title: "Health Score Engine",
      description: "Dynamic wellness tracking with gamified health scoring and insights",
      href: "/health-score",
      color: "from-green-500 to-emerald-500",
      badge: "Popular"
    },
    {
      icon: Brain,
      title: "Mental Health Assistant",
      description: "Mood analysis, guided meditation, and comprehensive mental wellness support",
      href: "/mental-health",
      color: "from-purple-500 to-pink-500",
      badge: "Wellness"
    },
    {
      icon: Heart,
      title: "AI Food Analyzer",
      description: "Nutritional analysis with macro/micronutrient breakdown and meal optimization",
      href: "/food-analyzer",
      color: "from-orange-500 to-red-500",
      badge: "Nutrition"
    },
    {
      icon: Award,
      title: "Health Gamification",
      description: "Challenges, achievements, and rewards to make wellness fun and engaging",
      href: "/gamification",
      color: "from-yellow-500 to-orange-500",
      badge: "Gamified"
    },
    {
      icon: Search,
      title: "Medical Research Assistant",
      description: "Evidence-based medical research with AI-powered analysis and clinical context",
      href: "/medical-research",
      color: "from-purple-500 to-indigo-500",
      badge: "Research"
    },
    {
      icon: Activity,
      title: "Health Dashboard",
      description: "Comprehensive health tracking with beautiful analytics and AI insights",
      href: "/dashboard",
      color: "from-indigo-500 to-purple-500",
      badge: "Analytics"
    },
    {
      icon: Calendar,
      title: "Smart Appointments",
      description: "Intelligent appointment scheduling with health provider integration",
      href: "/appointments",
      color: "from-teal-500 to-cyan-500",
      badge: "Smart"
    },
    {
      icon: Pill,
      title: "Medication Manager",
      description: "Track medications, interactions, side effects, and safety analysis",
      href: "/medications",
      color: "from-blue-500 to-indigo-500",
      badge: "Safety"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">MedAssist</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-secondary hover:text-primary transition-colors">Features</Link>
              <Link to="/pricing" className="text-secondary hover:text-primary transition-colors">Pricing</Link>
              <Link to="/about" className="text-secondary hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-secondary hover:text-primary transition-colors">Contact</Link>
            </div>

            <AuthNav variant="homepage" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 glass text-primary border-glass-border hover:bg-glass-strong-bg">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-r from-text-primary via-text-accent to-text-secondary bg-clip-text text-transparent">
              Your AI Health
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Companion
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of healthcare with neuromorphic AI that understands, 
              predicts, and protects your health before symptoms appear.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-2xl">
                  Start Your Health Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Button size="lg" variant="ghost" className="text-primary hover:bg-glass-bg px-8 py-4 text-lg font-semibold rounded-2xl border border-glass-border">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Feature Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`relative overflow-hidden bg-gradient-to-br ${feature.color} p-6 border-0 cursor-pointer transition-all duration-500 ${
                    activeFeature === index ? 'scale-105 shadow-2xl' : 'scale-100 opacity-70'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <feature.icon className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-secondary text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Complete Health
              <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                {" "}Ecosystem
              </span>
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Everything you need for optimal health, powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} to={service.href}>
                <Card className="group glass border-glass-border p-8 hover:bg-glass-strong-bg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color}/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    {service.badge && (
                      <Badge className={`bg-gradient-to-r ${service.color}/30 text-primary border-glass-border text-xs`}>
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="text-secondary mb-4">{service.description}</p>
                  <div className="flex items-center text-blue-400 font-medium group-hover:text-cyan-400 transition-colors">
                    Explore Feature
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1M+", label: "Lives Improved" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "24/7", label: "AI Monitoring" },
              { value: "50+", label: "Health Metrics" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Your Health?
            </span>
          </h2>
          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
            Join millions who trust MedAssist for their health journey. Start your 
            personalized wellness experience today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl">
                Start Free Trial
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link to="/features">
              <Button size="lg" variant="outline" className="border-glass-border text-primary hover:bg-glass-bg px-12 py-4 text-lg font-semibold rounded-2xl">
                <Search className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>HIPAA compliant</span>
            </div>
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold">MedAssist</span>
            </div>
            
            <div className="flex items-center space-x-8 text-secondary">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
            </div>
          </div>
          
          <div className="border-t border-glass-border mt-8 pt-8 text-center text-muted">
            <p>&copy; 2024 MedAssist. Revolutionizing healthcare with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
