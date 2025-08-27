/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// =================================
//     Symptom-to-Insight Engine
// =================================

export interface SymptomAnalysisRequest {
  symptoms: string; // Natural language text from the user
  userProfile?: { // Optional user data to refine analysis
    age?: number;
    sex?: 'male' | 'female' | 'other';
  };
}

export interface SymptomAnalysisResponse {
  request_id: string;
  timestamp: string;

  // High-level summary
  primary_diagnosis: string;
  urgency_score: number; // 0-10 scale
  urgency_level: 'Low' | 'Medium' | 'High' | 'Emergency';
  triage_advice: string;

  // Detailed breakdown
  potential_conditions: {
    condition: string;
    probability: number; // 0-1
    description: string;
    common_symptoms: string[];
  }[];

  // Actionable report
  formatted_report: {
    title: string;
    summary: string;
    sections: {
      heading: string;
      content: string;
    }[];
  };

  disclaimer: string;
}

// =================================
//      Dynamic Health Dashboard
// =================================

export interface VitalSign {
  name: 'Heart Rate' | 'Blood Pressure' | 'Temperature' | 'Blood Oxygen';
  value: string;
  unit: 'bpm' | 'mmHg' | '°F' | '%';
  status: 'Normal' | 'Elevated' | 'Low';
  timestamp: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  next_dose_in: string; // e.g., "2 hours"
}

export interface RecentActivity {
  id: string;
  type: 'Symptom Check' | 'Medication Log' | 'Appointment' | 'Health Score';
  description: string;
  timestamp: string;
}

export interface HealthGoal {
  id: string;
  title: string;
  progress: number; // 0-100
}

export interface DashboardDataResponse {
  user: {
    name: string;
    email: string;
  };
  last_updated: string;
  vitals: VitalSign[];
  prescriptions: Prescription[];
  recent_activity: RecentActivity[];
  health_goals: HealthGoal[];
  health_score: {
    current: number;
    trend: 'up' | 'down' | 'stable';
  };
}

// =================================
//        Authentication
// =================================

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
  name?: string;
  email: string;
  password:string;
}

export interface LoginCredentials {
  username: string; // Can be username or email
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
  };
  message: string;
}
