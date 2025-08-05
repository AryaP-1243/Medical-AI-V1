import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Construction, Heart, MessageSquare } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: any;
}

export default function Placeholder({ title, description, icon: Icon = Construction }: PlaceholderProps) {
  return (
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
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">MedAssist</span>
          </div>
          
          <div className="w-20"></div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Icon className="w-12 h-12 text-blue-400" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Coming Soon
            </span>
          </h1>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            {description}
          </p>
          
          <p className="text-white/40 mb-8">
            This feature is currently under development. We're working hard to bring you 
            the most advanced healthcare experience possible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl">
                Explore Available Features
              </Button>
            </Link>
            
            <Link to="/chat">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Assistant
              </Button>
            </Link>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold mb-4">Meanwhile, try these features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/symptom-analyzer" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <h4 className="font-medium mb-1">AI Symptom Analyzer</h4>
                <p className="text-sm text-white/60">Get instant health insights</p>
              </Link>
              <Link to="/chat" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <h4 className="font-medium mb-1">Medical Assistant</h4>
                <p className="text-sm text-white/60">Chat with AI doctor</p>
              </Link>
              <Link to="/dashboard" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <h4 className="font-medium mb-1">Health Dashboard</h4>
                <p className="text-sm text-white/60">Track your wellness</p>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
