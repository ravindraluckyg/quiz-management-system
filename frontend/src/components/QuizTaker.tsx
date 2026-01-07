import { useState } from 'react';
import { Quiz, Answer } from '../lib/api';

interface QuizTakerProps {
  quiz: Quiz;
  onSubmit: (userName: string, answers: Answer[]) => void;
  isLoading: boolean;
}

export default function QuizTaker({ quiz, onSubmit, isLoading }: QuizTakerProps) {
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedAnswers: Answer[] = quiz.questions.map((q) => ({
      questionId: q._id!,
      userAnswer: answers[q._id!] || '',
    }));

    onSubmit(userName, formattedAnswers);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{quiz.title}</h1>
        {quiz.description && (
          <p style={{ color: '#6b7280' }}>{quiz.description}</p>
        )}
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
          {quiz.questions.length} questions
        </p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Your Name (Optional)</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
          placeholder="Anonymous"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {quiz.questions.map((question, index) => (
          <div key={question._id} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                {index + 1}. {question.question}
              </h3>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{question.points} pts</span>
            </div>

            {question.type === 'MCQ' && question.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                      style={{ width: '1rem', height: '1rem' }}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'TRUE_FALSE' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['True', 'False'].map((option) => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                      style={{ width: '1rem', height: '1rem' }}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'TEXT' && (
              <input
                type="text"
                value={answers[question._id!] || ''}
                onChange={(e) => handleAnswerChange(question._id!, e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                placeholder="Type your answer..."
                required
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          background: isLoading ? '#9ca3af' : '#2563eb',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '1.125rem',
          fontWeight: '600'
        }}
      >
        {isLoading ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </form>
  );
}
