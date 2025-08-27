import { DashboardDataResponse, User } from '@shared/api';

// This is a mock service to generate dashboard data.
// In a real application, this data would come from a database, external APIs (like wearables), etc.

const generateMockDashboardData = (user: User): DashboardDataResponse => {
  const now = new Date();

  return {
    user: {
      name: user.name,
      email: user.email,
    },
    last_updated: now.toISOString(),
    vitals: [
      {
        name: 'Heart Rate',
        value: (60 + Math.floor(Math.random() * 20)).toString(),
        unit: 'bpm',
        status: 'Normal',
        timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString(),
      },
      {
        name: 'Blood Pressure',
        value: '120/80',
        unit: 'mmHg',
        status: 'Normal',
        timestamp: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      },
      {
        name: 'Temperature',
        value: '98.6',
        unit: '°F',
        status: 'Normal',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        name: 'Blood Oxygen',
        value: '98',
        unit: '%',
        status: 'Normal',
        timestamp: new Date(now.getTime() - 1000 * 60 * 5).toISOString(),
      },
    ],
    prescriptions: [
      {
        id: 'rx1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        next_dose_in: '18 hours',
      },
      {
        id: 'rx2',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        next_dose_in: '4 hours',
      },
    ],
    recent_activity: [
      {
        id: 'act1',
        type: 'Symptom Check',
        description: 'Analyzed symptoms: "headache and fever"',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 'act2',
        type: 'Medication Log',
        description: 'Logged Metformin 500mg dose',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
      },
      {
        id: 'act3',
        type: 'Appointment',
        description: 'Upcoming: Dr. Smith (Cardiology) in 2 days',
        timestamp: new Date(now.getTime() + 1000 * 60 * 60 * 48).toISOString(),
      },
       {
        id: 'act4',
        type: 'Health Score',
        description: 'Health score increased to 85',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    health_goals: [
      {
        id: 'goal1',
        title: 'Walk 10,000 steps daily',
        progress: 75,
      },
      {
        id: 'goal2',
        title: 'Drink 8 glasses of water',
        progress: 90,
      },
       {
        id: 'goal3',
        title: 'Sleep 7+ hours per night',
        progress: 50,
      },
    ],
    health_score: {
      current: 82,
      trend: 'up',
    },
  };
};

export const DashboardService = {
  getData: (user: User): Promise<DashboardDataResponse> => {
    // Wrap in a promise to simulate an async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockDashboardData(user));
      }, 300 + Math.random() * 500); // Simulate network latency
    });
  },
};
