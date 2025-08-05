import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  UserPlus,
  LogIn,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  Lock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { debugAuth } from "@/utils/authDebug";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!isLogin && !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isLogin && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        navigate("/dashboard");
      } else {
        await register(formData.username, formData.email, formData.password);
        navigate("/dashboard");
      }
    } catch (error: any) {
      setErrors({ 
        general: error.message || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const demoCredentials = [
    { username: "demo_user", password: "demo123" },
    { username: "patient_one", password: "patient123" },
    { username: "health_user", password: "health123" }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Back to home link */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">MedAssist</h1>
          </div>

          <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Shield className="w-4 h-4 mr-2" />
            Secure Medical Platform
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Join MedAssist"}
          </h2>
          <p className="text-white/60">
            {isLogin 
              ? "Sign in to access your health dashboard" 
              : "Create your account to start your health journey"
            }
          </p>
        </div>

        {/* Auth Form */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
          {/* Toggle Buttons */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setErrors({});
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
                isLogin 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span className="font-medium">Sign In</span>
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl transition-all ${
                !isLogin 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span className="font-medium">Sign Up</span>
            </button>
          </div>

          {/* Error Display */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label className="text-white/90 font-medium flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Username</span>
              </Label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 ${
                  errors.username ? 'border-red-500/50' : ''
                }`}
              />
              {errors.username && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Email Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-white/90 font-medium flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 ${
                    errors.email ? 'border-red-500/50' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="text-white/90 font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 pr-12 ${
                    errors.password ? 'border-red-500/50' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field (Register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-white/90 font-medium flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Confirm Password</span>
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 ${
                    errors.confirmPassword ? 'border-red-500/50' : ''
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 rounded-2xl font-semibold text-lg"
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </Button>
          </form>

          {/* Debug Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-medium text-white/70 mb-4 text-center">
              Debug & Test
            </h3>
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full text-sm border-white/20 text-white hover:bg-white/10"
                onClick={async () => {
                  try {
                    const result = await debugAuth.testAuthEndpoint();
                    console.log('Auth test result:', result);
                    setErrors({ general: result ? 'Auth endpoint working!' : 'Auth endpoint failed' });
                  } catch (error) {
                    console.error('Auth test error:', error);
                    setErrors({ general: 'Auth test failed: ' + (error as Error).message });
                  }
                }}
              >
                Test Auth Endpoint
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full text-sm border-white/20 text-white hover:bg-white/10"
                onClick={async () => {
                  try {
                    const result = await debugAuth.testLogin();
                    console.log('Login test result:', result);
                    if (result) {
                      setErrors({ general: 'Login test successful!' });
                    }
                  } catch (error) {
                    console.error('Login test error:', error);
                    setErrors({ general: 'Login test failed: ' + (error as Error).message });
                  }
                }}
              >
                Test Demo Login
              </Button>
            </div>
          </div>

          {/* Demo Accounts */}
          {isLogin && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/70 mb-4 text-center">
                Try Demo Accounts
              </h3>
              <div className="space-y-2">
                {demoCredentials.map((demo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        username: demo.username,
                        password: demo.password
                      }));
                    }}
                    className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{demo.username}</span>
                      <span className="text-xs text-white/60">Click to use</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Features for Registration */}
          {!isLogin && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/70 mb-4">
                What you'll get:
              </h3>
              <div className="space-y-3">
                {[
                  "AI-powered health analysis",
                  "Personalized medical insights",
                  "Secure health data storage",
                  "24/7 medical assistant chat"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-white/40 text-sm">
          <p>
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
