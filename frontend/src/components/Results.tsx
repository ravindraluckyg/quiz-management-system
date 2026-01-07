import { SubmissionResult } from '../lib/api';
import { Link } from 'react-router-dom';

interface ResultsProps {
  result: SubmissionResult;
}

export default function Results({ result }: ResultsProps) {
  const percentage = parseFloat(result.percentage);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: '#059669', bg: '#d1fae5' };
    if (percentage >= 80) return { grade: 'A', color: '#059669', bg: '#d1fae5' };
    if (percentage >= 70) return { grade: 'B', color: '#2563eb', bg: '#dbeafe' };
    if (percentage >= 60) return { grade: 'C', color: '#d97706', bg: '#fef3c7' };
    return { grade: 'D', color: '#dc2626', bg: '#fee2e2' };
  };

  const gradeInfo = getGrade();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        background: gradeInfo.bg,
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
          Quiz Completed!
        </h2>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: gradeInfo.color, marginBottom: '0.5rem' }}>
            {gradeInfo.grade}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            {result.score} / {result.totalPoints} points
          </div>
          <div style={{ fontSize: '1.25rem', color: '#374151' }}>
            {result.percentage}% Score
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Answer Review</h3>
        
        {result.answers.map((answer, index) => (
          <div
            key={index}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              border: `2px solid ${answer.isCorrect ? '#86efac' : '#fca5a5'}`,
              background: answer.isCorrect ? '#dcfce7' : '#fee2e2',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '500' }}>Question {index + 1}</span>
              <span
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  background: answer.isCorrect ? '#16a34a' : '#dc2626',
                  color: 'white'
                }}
              >
                {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </div>
            <div style={{ marginTop: '0.5rem', color: '#374151' }}>
              Your answer: <span style={{ fontWeight: '500' }}>{answer.userAnswer}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
