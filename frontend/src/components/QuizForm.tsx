import { useState } from 'react';
import { Question, Quiz } from '../lib/api';

interface QuizFormProps {
  onSubmit: (quiz: Quiz) => void;
  isLoading: boolean;
}

export default function QuizForm({ onSubmit, isLoading }: QuizFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'MCQ', question: '', options: ['', '', '', ''], correctAnswer: '', points: 1 }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { type: 'MCQ', question: '', options: ['', '', '', ''], correctAnswer: '', points: 1 }
    ]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    const options = [...(updated[qIndex].options || [])];
    options[oIndex] = value;
    updated[qIndex].options = options;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, questions });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '1rem 1rem 0 0',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Create New Quiz
        </h2>
        <p style={{ opacity: 0.9 }}>Fill in the details to create an engaging quiz</p>
      </div>

      {/* Quiz Details */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '0.75rem', marginBottom: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Quiz Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., General Knowledge Quiz"
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              border: '2px solid #e5e7eb', 
              borderRadius: '0.5rem',
              fontSize: '1rem',
              transition: 'border 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your quiz..."
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              border: '2px solid #e5e7eb', 
              borderRadius: '0.5rem',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            rows={3}
          />
        </div>
      </div>

      {/* Questions Section */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            Questions ({questions.length})
          </h3>
          <button
            type="button"
            onClick={addQuestion}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#10b981', 
              color: 'white', 
              borderRadius: '0.5rem', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>+</span> Add Question
          </button>
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} style={{ 
            padding: '1.5rem', 
            border: '2px solid #e5e7eb', 
            borderRadius: '1rem', 
            background: '#f9fafb',
            marginBottom: '1.5rem',
            position: 'relative'
          }}>
            {/* Question Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                background: '#667eea', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}>
                Question {qIndex + 1}
              </div>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  style={{ 
                    color: '#ef4444', 
                    background: '#fee2e2', 
                    border: 'none', 
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}
                >
                  ✕ Remove
                </button>
              )}
            </div>

            {/* Question Type */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                Question Type
              </label>
              <select
                value={q.type}
                onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="TRUE_FALSE">True/False</option>
                <option value="TEXT">Text Answer</option>
              </select>
            </div>

            {/* Question Text */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                Question Text *
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                placeholder="Enter your question here..."
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  background: 'white'
                }}
                required
              />
            </div>

            {/* MCQ Options */}
            {q.type === 'MCQ' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Options
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {q.options?.map((opt, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '0.5rem',
                        background: 'white',
                        fontSize: '0.95rem'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* True/False Info */}
            {q.type === 'TRUE_FALSE' && (
              <div style={{ 
                padding: '0.75rem', 
                background: '#dbeafe', 
                borderRadius: '0.5rem', 
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: '#1e40af'
              }}>
                ℹ️ Options will be: True / False
              </div>
            )}

            {/* Correct Answer */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Correct Answer *
                </label>
                {q.type === 'TRUE_FALSE' ? (
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '0.5rem',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                    placeholder="Enter correct answer"
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem 1rem', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '0.5rem',
                      background: 'white'
                    }}
                    required
                  />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  Points
                </label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value) || 1)}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '0.5rem',
                    background: 'white'
                  }}
                  min="1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '1rem 1.5rem',
          background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '0.75rem',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '1.125rem',
          fontWeight: '700',
          boxShadow: isLoading ? 'none' : '0 4px 15px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {isLoading ? '⏳ Creating Quiz...' : '✨ Create Quiz'}
      </button>
    </form>
  );
}
