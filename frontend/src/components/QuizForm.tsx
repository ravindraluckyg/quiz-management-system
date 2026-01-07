import { useState } from 'react';
import type { Question, Quiz } from '../lib/api';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Quiz Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Question
          </button>
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium">Question {qIndex + 1}</h4>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Type</label>
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="MCQ">Multiple Choice</option>
                  <option value="TRUE_FALSE">True/False</option>
                  <option value="TEXT">Text Answer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Question *</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {q.type === 'MCQ' && (
                <div>
                  <label className="block text-sm mb-1">Options</label>
                  {q.options?.map((opt, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="w-full px-3 py-2 border rounded mb-2"
                    />
                  ))}
                </div>
              )}

              {q.type === 'TRUE_FALSE' && (
                <div className="text-sm text-gray-600">
                  Options: True / False
                </div>
              )}

              <div>
                <label className="block text-sm mb-1">Correct Answer *</label>
                {q.type === 'MCQ' || q.type === 'TEXT' ? (
                  <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                ) : (
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Points</label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                  min="1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Creating...' : 'Create Quiz'}
      </button>
    </form>
  );
}
