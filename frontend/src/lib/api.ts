import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Question {
  _id?: string;
  type: 'MCQ' | 'TRUE_FALSE' | 'TEXT';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface Quiz {
  _id?: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt?: Date;
  isActive?: boolean;
}

export interface Answer {
  questionId: string;
  userAnswer: string;
}

export interface SubmissionResult {
  submissionId: string;
  score: number;
  totalPoints: number;
  percentage: string;
  answers: Array<{
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
  }>;
}

export const quizAPI = {
  createQuiz: async (quiz: Quiz) => {
    const response = await api.post('/quizzes', quiz);
    return response.data;
  },

  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  getQuizById: async (id: string) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  deleteQuiz: async (id: string) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  },

  submitQuiz: async (quizId: string, userName: string, answers: Answer[]) => {
    const response = await api.post('/submissions', {
      quizId,
      userName,
      answers,
    });
    return response.data;
  },
};

export default api;
