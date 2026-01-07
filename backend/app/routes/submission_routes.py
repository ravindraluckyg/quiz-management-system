from flask import Blueprint, request, jsonify
from app.models.quiz import Quiz
from app.models.submission import Submission
from app.config.database import get_db

submission_bp = Blueprint('submission', __name__)

@submission_bp.route('/', methods=['POST'])
def submit_quiz():
    try:
        db = get_db()
        quiz_model = Quiz(db)
        submission_model = Submission(db)
        
        data = request.json
        quiz_id = data.get('quizId')
        user_name = data.get('userName', 'Anonymous')
        answers = data.get('answers', [])
        
        quiz = quiz_model.get_by_id_with_answers(quiz_id)
        if not quiz:
            return jsonify({'success': False, 'error': 'Quiz not found'}), 404
        
        score = 0
        total_points = 0
        evaluated_answers = []
        
        for answer in answers:
            question_id = str(answer['questionId'])
            user_answer = answer['userAnswer'].lower().strip()
            
            question = next((q for q in quiz['questions'] if str(q.get('_id', '')) == question_id), None)
            if question:
                total_points += question.get('points', 1)
                correct_answer = question.get('correctAnswer', '').lower().strip()
                is_correct = user_answer == correct_answer
                
                if is_correct:
                    score += question.get('points', 1)
                
                evaluated_answers.append({
                    'questionId': question_id,
                    'userAnswer': answer['userAnswer'],
                    'isCorrect': is_correct
                })
        
        submission_data = {
            'quizId': quiz_id,
            'userName': user_name,
            'answers': evaluated_answers,
            'score': score,
            'totalPoints': total_points
        }
        
        submission_id = submission_model.create(submission_data)
        
        return jsonify({
            'success': True,
            'data': {
                'submissionId': submission_id,
                'score': score,
                'totalPoints': total_points,
                'percentage': f"{(score / total_points * 100):.2f}" if total_points > 0 else "0",
                'answers': evaluated_answers
            }
        }), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400
