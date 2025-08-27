import bcrypt from 'bcryptjs';
import { User, CreateUserData, LoginCredentials } from '@shared/api';

export class UserModel {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
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
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  private comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private generateId(): number {
    return this.nextId++;
  }

  createUser(userData: CreateUserData): User {
    const existingUser = this.users.find(
      user => user.username === userData.username || user.email === userData.email
    );

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const user: User = {
      id: this.generateId(),
      username: userData.username,
      name: userData.name || userData.username,
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
      u => (u.username === credentials.username || u.email === credentials.username) && u.is_active
    );

    if (!user) {
      return null;
    }

    if (!this.comparePassword(credentials.password, user.password_hash)) {
      return null;
    }

    return user;
  }

  updatePassword(userId: number, newPassword: string):boolean {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return false;
    }
    this.users[userIndex].password_hash = this.hashPassword(newPassword);
    this.users[userIndex].updated_at = new Date();
    return true;
  }

  getUserById(id: number): User | null {
    return this.users.find(user => user.id === id && user.is_active) || null;
  }

  getUserByUsername(username: string): User | null {
    return this.users.find(user => user.username === username && user.is_active) || null;
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'created_at' | 'password_hash'>>): User | null {
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
      last_login: new Date(),
      is_active: user.is_active
    };
  }
}

export const userModel = new UserModel();
