import { useEffect, useState } from 'react';
import { quizAPI, Quiz } from '../lib/api';
import QuizList from '../components/QuizList';
import { Link } from 'react-router-dom';

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const response = await quizAPI.getAllQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Quiz Management System
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>
            Test your knowledge with our interactive quizzes
          </p>
          <Link
            to="/admin"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: '#4f46e5',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Create New Quiz (Admin)
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading quizzes...</p>
          </div>
        ) : (
          <QuizList quizzes={quizzes} />
        )}
      </div>
    </div>
  );
}
