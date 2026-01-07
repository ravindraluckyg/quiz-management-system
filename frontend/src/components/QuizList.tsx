import { Quiz } from '../lib/api';
import { Link } from 'react-router-dom';

interface QuizListProps {
  quizzes: Quiz[];
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export default function QuizList({ quizzes, onDelete, showActions = false }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
        <p style={{ color: '#6b7280' }}>No quizzes available yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
      {quizzes.map((quiz) => (
        <div key={quiz._id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{quiz.title}</h3>
          {quiz.description && (
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.875rem' }}>{quiz.description}</p>
          )}
          <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>
            {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              to={`/quiz/${quiz._id}`}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.5rem 1rem',
                background: '#2563eb',
                color: 'white',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Take Quiz
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
