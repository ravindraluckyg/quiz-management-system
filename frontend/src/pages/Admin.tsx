import { useState } from 'react';
import { quizAPI, Quiz } from '../lib/api';
import QuizForm from '../components/QuizForm';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateQuiz = async (quiz: Quiz) => {
    setIsLoading(true);
    setError('');

    try {
      await quizAPI.createQuiz(quiz);
      alert('Quiz created successfully!');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Admin Panel</h1>
          <p style={{ color: '#6b7280' }}>Create and manage quizzes</p>
        </div>

        {error && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            background: '#fef2f2', 
            border: '1px solid #fecaca', 
            borderRadius: '0.5rem',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <QuizForm onSubmit={handleCreateQuiz} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
