import { RequestHandler } from "express";

// Simple authentication for debugging without JWT
export const handleSimpleLogin: RequestHandler = async (req, res) => {
  console.log('Simple login attempt:', req.body);
  
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    // Check demo credentials
    const demoUsers = [
      { username: 'demo_user', password: 'demo123', name: 'Demo User', email: 'demo@example.com' },
      { username: 'patient_one', password: 'patient123', name: 'Patient One', email: 'patient@example.com' },
      { username: 'health_user', password: 'health123', name: 'Health User', email: 'health@example.com' }
    ];

    const user = demoUsers.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid username or password' 
      });
    }

    // Return a simple token (just base64 encoded username for debugging)
    const simpleToken = Buffer.from(username).toString('base64');

    res.json({
      success: true,
      token: simpleToken,
      user: {
        id: 1,
        username: user.username,
        name: user.name,
        email: user.email
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Simple login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login' 
    });
  }
};

export const handleSimpleRegister: RequestHandler = async (req, res) => {
  console.log('Simple registration attempt:', req.body);
  
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters' 
      });
    }

    // For debugging, just accept any new registration
    const simpleToken = Buffer.from(username).toString('base64');

    res.status(201).json({
      success: true,
      token: simpleToken,
      user: {
        id: Math.floor(Math.random() * 1000),
        username,
        name: username,
        email
      },
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Simple registration error:', error);
    res.status(500).json({ 
      error: 'Internal server error during registration' 
    });
  }
};

export const handleSimpleMe: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Access token required' 
      });
    }

    const token = authHeader.substring(7);
    
    try {
      // Decode the simple token (base64 encoded username)
      const username = Buffer.from(token, 'base64').toString();
      
      // Return user data
      res.json({
        id: 1,
        username,
        name: username,
        email: `${username}@example.com`
      });
    } catch (decodeError) {
      return res.status(403).json({ 
        error: 'Invalid token' 
      });
    }

  } catch (error) {
    console.error('Simple me error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
