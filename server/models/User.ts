import crypto from 'crypto';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export interface CreateUserData {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export class UserModel {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with demo users (based on your Python files)
    this.initializeDemoUsers();
  }

  private initializeDemoUsers() {
    const demoUsers = [
      {
        username: 'demo_user',
        name: 'Demo User',
        email: 'demo@healthapp.com',
        password: 'demo123'
      },
      {
        username: 'patient_one',
        name: 'John Smith',
        email: 'patient1@healthapp.com',
        password: 'patient123'
      },
      {
        username: 'health_user',
        name: 'Health Monitor',
        email: 'user@healthapp.com',
        password: 'health123'
      }
    ];

    demoUsers.forEach(userData => {
      this.createUser(userData);
    });
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private generateId(): number {
    return this.nextId++;
  }

  createUser(userData: CreateUserData): User {
    // Check if username or email already exists
    const existingUser = this.users.find(
      user => user.username === userData.username || user.email === userData.email
    );

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const user: User = {
      id: this.generateId(),
      username: userData.username,
      name: userData.name,
      email: userData.email,
      password_hash: this.hashPassword(userData.password),
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    };

    this.users.push(user);
    return user;
  }

  authenticateUser(credentials: LoginCredentials): User | null {
    const user = this.users.find(
      user => user.username === credentials.username && user.is_active
    );

    if (!user) {
      return null;
    }

    const passwordHash = this.hashPassword(credentials.password);
    if (user.password_hash !== passwordHash) {
      return null;
    }

    return user;
  }

  getUserById(id: number): User | null {
    return this.users.find(user => user.id === id && user.is_active) || null;
  }

  getUserByUsername(username: string): User | null {
    return this.users.find(user => user.username === username && user.is_active) || null;
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'created_at'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updated_at: new Date()
    };

    return this.users[userIndex];
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users[userIndex].is_active = false;
    this.users[userIndex].updated_at = new Date();
    return true;
  }

  getAllUsers(): User[] {
    return this.users.filter(user => user.is_active);
  }

  // Get user statistics (similar to your Python database_manager.py)
  getUserStatistics(userId: number) {
    const user = this.getUserById(userId);
    if (!user) {
      return null;
    }

    return {
      user_id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      last_login: new Date(), // This would be tracked in a real database
      is_active: user.is_active
    };
  }
}

// Singleton instance for in-memory storage
export const userModel = new UserModel();
