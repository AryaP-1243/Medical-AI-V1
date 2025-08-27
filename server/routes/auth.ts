import { RequestHandler } from "express";
import { userModel } from "../models/User";
import { AuthUtils, AuthenticatedRequest } from "../utils/auth";
import { CreateUserData, LoginCredentials } from "@shared/api";

// Login endpoint
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { username, password }: LoginCredentials = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = userModel.authenticateUser({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = AuthUtils.generateToken(user);
    const sanitizedUser = AuthUtils.sanitizeUser(user);

    res.json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

// Register endpoint
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { username, email, password, name }: CreateUserData = req.body;

    const validation = AuthUtils.validateRegistrationData(username, email, password);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors.join(', ') });
    }

    const userData: CreateUserData = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      name: name?.trim() || username.trim()
    };

    const user = userModel.createUser(userData);
    const token = AuthUtils.generateToken(user);
    const sanitizedUser = AuthUtils.sanitizeUser(user);

    res.status(201).json({
      success: true,
      token,
      user: sanitizedUser,
      message: 'Registration successful'
    });

  } catch (error: any) {
    if (error.message === 'Username or email already exists') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

// Get current user endpoint (protected)
export const handleGetCurrentUser: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sanitizedUser = AuthUtils.sanitizeUser(user);
    res.json(sanitizedUser);

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user profile endpoint (protected)
export const handleUpdateProfile: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { name, email } = req.body;
    const updates: any = {};

    if (name !== undefined) {
      updates.name = name.trim();
    }
    if (email !== undefined) {
      updates.email = email.trim().toLowerCase();
    }

    const updatedUser = userModel.updateUser(userId, updates);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sanitizedUser = AuthUtils.sanitizeUser(updatedUser);
    res.json({
      success: true,
      user: sanitizedUser,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Change password endpoint (protected)
export const handleChangePassword: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    const passwordValidation = AuthUtils.validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.errors.join(', ') });
    }

    const user = userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isCurrentPasswordValid = userModel.authenticateUser({
      username: user.username,
      password: currentPassword
    });

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const success = userModel.updatePassword(userId, newPassword);

    if (!success) {
      return res.status(500).json({ error: 'Failed to update password' });
    }

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get user statistics (protected)
export const handleGetUserStats: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const stats = userModel.getUserStatistics(userId);
    if (!stats) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(stats);

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout endpoint
export const handleLogout: RequestHandler = async (_req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
};
