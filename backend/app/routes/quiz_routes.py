from flask import Blueprint, request, jsonify
from bson import ObjectId
from app.config.database import get_db

quiz_bp = Blueprint('quiz', __name__)

def serialize_quiz(quiz):
    """Convert ObjectId to string for JSON serialization"""
    if quiz:
        quiz['_id'] = str(quiz['_id'])
        for question in quiz.get('questions', []):
            if '_id' in question:
                question['_id'] = str(question['_id'])
    return quiz

@quiz_bp.route('/', methods=['POST'])
def create_quiz():
    try:
        data = request.get_json()
        db = get_db()
        
        # Add ObjectId to questions
        for question in data.get('questions', []):
            question['_id'] = ObjectId()
        
        data['isActive'] = True
        result = db.quizzes.insert_one(data)
        
        quiz = db.quizzes.find_one({'_id': result.inserted_id})
        return jsonify({'success': True, 'data': serialize_quiz(quiz)}), 201
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@quiz_bp.route('/', methods=['GET'])
def get_all_quizzes():
    try:
        db = get_db()
        quizzes = list(db.quizzes.find({'isActive': True}))
        
        # Serialize all quizzes
        for quiz in quizzes:
            serialize_quiz(quiz)
        
        return jsonify({'success': True, 'data': quizzes}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@quiz_bp.route('/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    try:
        db = get_db()
        quiz = db.quizzes.find_one({'_id': ObjectId(quiz_id)})
        
        if not quiz:
            return jsonify({'success': False, 'error': 'Quiz not found'}), 404
        
        # Remove correct answers for quiz takers
        for question in quiz.get('questions', []):
            question.pop('correctAnswer', None)
        
        return jsonify({'success': True, 'data': serialize_quiz(quiz)}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@quiz_bp.route('/<quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    try:
        db = get_db()
        result = db.quizzes.update_one(
            {'_id': ObjectId(quiz_id)},
            {'$set': {'isActive': False}}
        )
        
        if result.modified_count == 0:
            return jsonify({'success': False, 'error': 'Quiz not found'}), 404
        
        return jsonify({'success': True, 'message': 'Quiz deleted'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
