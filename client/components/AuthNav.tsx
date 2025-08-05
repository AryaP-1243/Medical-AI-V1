import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  Activity,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

interface AuthNavProps {
  variant?: 'homepage' | 'app';
}

export default function AuthNav({ variant = 'homepage' }: AuthNavProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth">
          <Button 
            variant="ghost" 
            className={variant === 'homepage' ? "text-white hover:bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10"}
          >
            Sign In
          </Button>
        </Link>
        <Link to="/auth">
          <Button 
            className={variant === 'homepage' ? "bg-white text-black hover:bg-white/90" : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"}
          >
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Quick Actions for App Variant */}
      {variant === 'app' && (
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/chat">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/symptom-analyzer">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <Activity className="w-4 h-4 mr-2" />
              Analyze
            </Button>
          </Link>
        </div>
      )}

      {/* User Menu */}
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="ghost"
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center space-x-2 ${
            variant === 'homepage' ? 'text-white hover:bg-white/10' : 'text-white/90 hover:text-white hover:bg-white/10'
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium">{user?.name || user?.username}</div>
            {variant === 'app' && (
              <div className="text-xs text-white/60">{user?.email}</div>
            )}
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{user?.name || user?.username}</div>
                  <div className="text-sm text-white/60">{user?.email}</div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-1">
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-2">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Link 
                  to="/dashboard" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Health Dashboard</span>
                </Link>
                <Link 
                  to="/chat" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>AI Assistant</span>
                </Link>
                <Link 
                  to="/symptom-analyzer" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <Activity className="w-4 h-4" />
                  <span>Symptom Analyzer</span>
                </Link>
                <Link 
                  to="/records" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                >
                  <Heart className="w-4 h-4" />
                  <span>Health Records</span>
                </Link>
              </div>

              <div className="border-t border-white/10 mt-2 pt-2">
                <button
                  onClick={() => {
                    // TODO: Add profile/settings navigation
                    setShowDropdown(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors text-white/80 hover:text-white w-full"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-red-500/20 transition-colors text-red-400 hover:text-red-300 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
