// Debug utility for testing authentication
export const debugAuth = {
  async testAuthEndpoint() {
    try {
      const response = await fetch('/api/auth/test');
      const data = await response.json();
      console.log('Auth test endpoint:', data);
      return data;
    } catch (error) {
      console.error('Auth test failed:', error);
      return null;
    }
  },

  async testLogin(username: string = 'demo_user', password: string = 'demo123') {
    try {
      console.log('Testing login with:', { username, password });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Login response status:', response.status);
      console.log('Login response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed with status:', response.status, 'Body:', errorText);
        return null;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      return data;
    } catch (error) {
      console.error('Login test error:', error);
      return null;
    }
  },

  async testRegister(username: string = 'test_user', email: string = 'test@example.com', password: string = 'test123') {
    try {
      console.log('Testing registration with:', { username, email, password });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      console.log('Register response status:', response.status);
      console.log('Register response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration failed with status:', response.status, 'Body:', errorText);
        return null;
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      return data;
    } catch (error) {
      console.error('Registration test error:', error);
      return null;
    }
  }
};

// Make it available globally for browser console debugging
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuth;
}
