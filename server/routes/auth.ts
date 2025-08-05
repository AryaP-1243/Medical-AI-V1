import { RequestHandler } from "express";
import crypto from "crypto";
import { userModel, CreateUserData, LoginCredentials } from "../models/User";
import { AuthUtils, AuthenticatedRequest } from "../utils/auth";

// Login endpoint
export const handleLogin: RequestHandler = async (req, res) => {
  console.log('Login attempt:', { username: req.body?.username, hasPassword: !!req.body?.password });
  try {
    const { username, password }: LoginCredentials = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required' 
      });
    }

    // Authenticate user
    const user = userModel.authenticateUser({ username, password });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid username or password' 
      });
    }

    // Generate JWT token
    const token = AuthUtils.generateToken(user);

    // Return user data and token (without password hash)
    const sanitizedUser = AuthUtils.sanitizeUser(user);

    res.json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login' 
    });
  }
};

// Register endpoint
export const handleRegister: RequestHandler = async (req, res) => {
  console.log('Registration attempt:', { username: req.body?.username, email: req.body?.email, hasPassword: !!req.body?.password });
  try {
    const { username, email, password, name }: CreateUserData & { name?: string } = req.body;

    // Validate input
    const validation = AuthUtils.validateRegistrationData(username, email, password);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.errors.join(', ') 
      });
    }

    // Create user data
    const userData: CreateUserData = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      name: name?.trim() || username.trim() // Use username as name if not provided
    };

    // Create user
    const user = userModel.createUser(userData);

    // Generate JWT token
    const token = AuthUtils.generateToken(user);

    // Return user data and token (without password hash)
    const sanitizedUser = AuthUtils.sanitizeUser(user);

    res.status(201).json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Registration successful'
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle specific errors
    if (error.message === 'Username or email already exists') {
      return res.status(409).json({ 
        error: 'Username or email already exists' 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error during registration' 
    });
  }
};

// Get current user endpoint (protected)
export const handleGetCurrentUser: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Return user data without password hash
    const sanitizedUser = AuthUtils.sanitizeUser(user);
    res.json(sanitizedUser);

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Update user profile endpoint (protected)
export const handleUpdateProfile: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const { name, email } = req.body;
    const updates: any = {};

    // Validate and add name if provided
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 1) {
        return res.status(400).json({ 
          error: 'Name must be a non-empty string' 
        });
      }
      updates.name = name.trim();
    }

    // Validate and add email if provided
    if (email !== undefined) {
      const emailValidation = AuthUtils.validateEmail(email);
      if (!emailValidation.valid) {
        return res.status(400).json({ 
          error: emailValidation.errors.join(', ') 
        });
      }
      updates.email = email.trim().toLowerCase();
    }

    // Update user
    const updatedUser = userModel.updateUser(userId, updates);
    if (!updatedUser) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Return updated user data without password hash
    const sanitizedUser = AuthUtils.sanitizeUser(updatedUser);
    res.json({
      success: true,
      user: sanitizedUser,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Change password endpoint (protected)
export const handleChangePassword: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Current password and new password are required' 
      });
    }

    // Validate new password
    const passwordValidation = AuthUtils.validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({ 
        error: passwordValidation.errors.join(', ') 
      });
    }

    // Get current user
    const user = userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    // Verify current password
    const isCurrentPasswordValid = userModel.authenticateUser({
      username: user.username,
      password: currentPassword
    });

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ 
        error: 'Current password is incorrect' 
      });
    }

    // Update password (this would hash the new password)
    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    
    const updatedUser = userModel.updateUser(userId, { 
      password_hash: newPasswordHash 
    });

    if (!updatedUser) {
      return res.status(500).json({ 
        error: 'Failed to update password' 
      });
    }

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Get user statistics (protected)
export const handleGetUserStats: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    const stats = userModel.getUserStatistics(userId);
    if (!stats) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json(stats);

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Logout endpoint (optional - mainly for token cleanup on client)
export const handleLogout: RequestHandler = async (req, res) => {
  try {
    // In a more sophisticated system, you might want to blacklist the token
    // For now, just return success - the client will remove the token
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};
