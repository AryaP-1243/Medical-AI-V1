import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('medassist_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const userData = await response.json();
          setUser(userData);
        } catch (jsonError) {
          console.error('Failed to parse auth check response:', jsonError);
          localStorage.removeItem('medassist_token');
        }
      } else {
        console.log('Auth check failed with status:', response.status);
        localStorage.removeItem('medassist_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('medassist_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login for user:', username);

      let response;
      try {
        response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error('Unable to connect to authentication server. Please try again.');
      }

      console.log('Login response status:', response.status);
      console.log('Login response ok:', response.ok);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        console.error('Login response not ok:', response.status, response.statusText);
        // Try to get error message from response
        let errorMessage = 'Login failed';
        try {
          const responseText = await response.text();
          console.log('Error response text:', responseText);

          // Try to parse as JSON
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.error || errorMessage;
          } catch (parseError) {
            console.log('Response is not JSON:', parseError);
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
        } catch (textError) {
          console.error('Could not read response text:', textError);
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse login response as JSON:', jsonError);
        throw new Error('Invalid response from server');
      }

      // Validate response structure
      if (!data.token || !data.user) {
        throw new Error('Invalid login response: missing token or user data');
      }

      // Store token and user data
      localStorage.setItem('medassist_token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);

      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check your connection.');
      }

      // Re-throw the original error
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // If response isn't JSON, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse registration response as JSON:', jsonError);
        throw new Error('Invalid response from server');
      }

      // Validate response structure
      if (!data.token || !data.user) {
        throw new Error('Invalid registration response: missing token or user data');
      }

      // Store token and user data
      localStorage.setItem('medassist_token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('medassist_token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
