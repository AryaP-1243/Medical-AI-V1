import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'medassist-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  userId?: number;
}

export class AuthUtils {
  static generateToken(user: User): string {
    const payload: JWTPayload = {
      userId: user.id,
      username: user.username
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    // Handle "Bearer token" format
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Handle direct token
    return authHeader;
  }

  static authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const payload = AuthUtils.verifyToken(token);
    if (!payload) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.userId = payload.userId;
    next();
  }

  static optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (token) {
      const payload = AuthUtils.verifyToken(token);
      if (payload) {
        req.userId = payload.userId;
      }
    }

    next();
  }

  static sanitizeUser(user: User): Omit<User, 'password_hash'> {
    const { password_hash, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
      if (password.length > 128) {
        errors.push('Password must be less than 128 characters');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateUsername(username: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!username) {
      errors.push('Username is required');
    } else {
      if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
      }
      if (username.length > 50) {
        errors.push('Username must be less than 50 characters');
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateEmail(email: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }
      if (email.length > 255) {
        errors.push('Email must be less than 255 characters');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateRegistrationData(username: string, email: string, password: string) {
    const usernameValidation = AuthUtils.validateUsername(username);
    const emailValidation = AuthUtils.validateEmail(email);
    const passwordValidation = AuthUtils.validatePassword(password);

    const allErrors = [
      ...usernameValidation.errors,
      ...emailValidation.errors,
      ...passwordValidation.errors
    ];

    return {
      valid: allErrors.length === 0,
      errors: allErrors
    };
  }
}
