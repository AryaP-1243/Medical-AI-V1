import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthNav from "@/components/AuthNav";
import { useAuth } from "@/contexts/AuthContext";
import {
  MessageSquare,
  Send,
  Brain,
  ArrowLeft,
  Mic,
  Plus,
  Settings,
  MoreHorizontal,
  Heart,
  Activity,
  Clock,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm MedAssist, your AI medical companion. I'm here to help with health questions, symptom analysis, and medical guidance. What can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, I'd recommend monitoring them closely. Can you tell me more about when they started and their severity?",
        "That's a great question about your health. Let me provide some evidence-based information to help you understand your situation better.",
        "I understand your concern. Here are some recommendations that might help, but remember to consult with a healthcare provider for personalized advice.",
        "Your health data suggests some interesting patterns. Let me analyze this further and provide personalized insights."
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const quickActions = [
    "Analyze my symptoms",
    "Medication interactions",
    "Health trends",
    "Emergency guidance"
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-white/10 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">AI Medical Assistant</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </div>
          
          <AuthNav variant="app" />
        </div>
      </nav>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/10 p-6 flex-shrink-0 hidden lg:block">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                AI Capabilities
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Heart, label: "Symptom Analysis", desc: "Advanced pattern recognition" },
                  { icon: Activity, label: "Health Monitoring", desc: "Real-time insights" },
                  { icon: Clock, label: "24/7 Support", desc: "Always available" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                    <item.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-white/60">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-white/10 text-white/80"
                    onClick={() => setInput(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-500/30">
              <h4 className="font-semibold mb-2">Health Tip</h4>
              <p className="text-sm text-white/80">
                Regular health check-ins help me provide better personalized recommendations for your wellness journey.
              </p>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </div>
                  
                  <Card className={`p-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <div className="text-white/90 leading-relaxed">
                      {message.content}
                    </div>
                    <div className="text-xs text-white/40 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </Card>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  
                  <Card className="p-4 bg-white/5 border-white/10">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask me about your health, symptoms, medications, or any health-related questions..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 pr-12 text-white placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 bottom-2 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-white/40">
                  <span>Shift + Enter for new line</span>
                  <span>Always consult healthcare providers for serious concerns</span>
                </div>
              </div>
              
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Warning */}
      <div className="border-t border-red-500/30 bg-red-500/10 p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 text-sm">
            <strong>Emergency Notice:</strong> If you're experiencing a medical emergency, call emergency services immediately. 
            This AI assistant is not a substitute for professional medical care.
          </p>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}
