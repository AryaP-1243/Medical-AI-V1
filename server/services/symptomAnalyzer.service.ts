import { SymptomAnalysisRequest, SymptomAnalysisResponse } from '@shared/api';
import crypto from 'crypto';

// This is a mock AI service. In the future, this could be replaced with a call to a real AI model (e.g., GPT, a custom health LLM).

const generateMockResponse = (request: SymptomAnalysisRequest): SymptomAnalysisResponse => {
  const { symptoms } = request;
  const lowerCaseSymptoms = symptoms.toLowerCase();

  let primary_diagnosis: string;
  let urgency_score: number;
  let urgency_level: 'Low' | 'Medium' | 'High' | 'Emergency';
  let triage_advice: string;
  let potential_conditions: SymptomAnalysisResponse['potential_conditions'];

  if (lowerCaseSymptoms.includes('headache') && lowerCaseSymptoms.includes('fever')) {
    primary_diagnosis = 'Possible Influenza or Viral Infection';
    urgency_score = 5;
    urgency_level = 'Medium';
    triage_advice = 'Rest, hydrate, and monitor symptoms. Consider consulting a doctor if symptoms worsen or persist for more than 3 days.';
    potential_conditions = [
      {
        condition: 'Influenza',
        probability: 0.7,
        description: 'A common viral infection that can be deadly, especially in high-risk groups.',
        common_symptoms: ['fever', 'chills', 'muscle aches', 'cough', 'sore throat'],
      },
      {
        condition: 'Common Cold',
        probability: 0.2,
        description: 'A mild viral infection of the nose and throat.',
        common_symptoms: ['runny nose', 'sneezing', 'sore throat'],
      },
      {
        condition: 'Meningitis',
        probability: 0.05,
        description: 'A serious infection of the membranes covering the brain and spinal cord. Requires immediate medical attention.',
        common_symptoms: ['stiff neck', 'severe headache', 'sensitivity to light', 'confusion'],
      },
    ];
  } else if (lowerCaseSymptoms.includes('chest pain') && lowerCaseSymptoms.includes('shortness of breath')) {
    primary_diagnosis = 'Potential Cardiac Event';
    urgency_score = 10;
    urgency_level = 'Emergency';
    triage_advice = 'This could be a medical emergency. Please call emergency services (e.g., 911) immediately. Do not attempt to drive yourself to the hospital.';
    potential_conditions = [
      {
        condition: 'Myocardial Infarction (Heart Attack)',
        probability: 0.8,
        description: 'A blockage of blood flow to the heart muscle.',
        common_symptoms: ['chest pain or pressure', 'shortness of breath', 'pain in left arm', 'sweating'],
      },
      {
        condition: 'Pulmonary Embolism',
        probability: 0.15,
        description: 'A blood clot that travels to the lungs.',
        common_symptoms: ['sharp chest pain', 'shortness of breath', 'rapid heart rate', 'coughing up blood'],
      },
      {
        condition: 'Panic Attack',
        probability: 0.05,
        description: 'A sudden episode of intense fear that triggers severe physical reactions when there is no real danger.',
        common_symptoms: ['racing heart', 'sweating', 'trembling', 'feeling of impending doom'],
      },
    ];
  } else {
    primary_diagnosis = 'General Malaise';
    urgency_score = 2;
    urgency_level = 'Low';
    triage_advice = 'Your symptoms are non-specific. Monitor your condition and consult a healthcare professional if you feel worse.';
    potential_conditions = [
      {
        condition: 'General Fatigue',
        probability: 0.6,
        description: 'A feeling of tiredness or lack of energy.',
        common_symptoms: ['weariness', 'sleepiness', 'low energy'],
      },
      {
        condition: 'Dehydration',
        probability: 0.3,
        description: 'Occurs when you use or lose more fluid than you take in.',
        common_symptoms: ['thirst', 'dark urine', 'dizziness'],
      },
    ];
  }

  return {
    request_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    primary_diagnosis,
    urgency_score,
    urgency_level,
    triage_advice,
    potential_conditions,
    formatted_report: {
      title: `AI Health Analysis for: "${symptoms}"`,
      summary: `Based on the reported symptoms, the primary assessment is a **${urgency_level}** urgency for **${primary_diagnosis}**. ${triage_advice}`,
      sections: [
        {
          heading: 'Potential Conditions',
          content: potential_conditions.map(p => `- ${p.condition} (${(p.probability * 100).toFixed(0)}% probability)`).join('\n'),
        },
        {
          heading: 'Detailed Symptom Review',
          content: 'The AI analyzed the following key symptoms: ' + symptoms.split(' ').join(', '),
        },
      ],
    },
    disclaimer: 'This is an AI-generated analysis and not a substitute for professional medical advice. Please consult a doctor for any health concerns.',
  };
};

export const SymptomAnalyzerService = {
  analyze: (request: SymptomAnalysisRequest): Promise<SymptomAnalysisResponse> => {
    // Wrap in a promise to simulate an async operation (like a real API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockResponse(request));
      }, 500 + Math.random() * 1000); // Simulate network latency
    });
  },
};
