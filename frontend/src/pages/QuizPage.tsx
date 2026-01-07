import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { quizAPI, Quiz, SubmissionResult } from '../lib/api';
import QuizTaker from '../components/QuizTaker';
import Results from '../components/Results';

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      const response = await quizAPI.getQuizById(id as string);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (userName: string, answers: any[]) => {
    setSubmitting(true);
    try {
      const response = await quizAPI.submitQuiz(
        id as string,
        userName,
        answers
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quiz Not Found</h1>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {result ? (
          <Results result={result} />
        ) : (
          <QuizTaker quiz={quiz} onSubmit={handleSubmit} isLoading={submitting} />
        )}
      </div>
    </div>
  );
}
