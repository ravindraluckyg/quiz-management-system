from bson import ObjectId
from datetime import datetime

class Quiz:
    def __init__(self, db):
        self.collection = db['quizzes']
    
    def create(self, data):
        data['createdAt'] = datetime.utcnow()
        data['isActive'] = True
        result = self.collection.insert_one(data)
        return str(result.inserted_id)
    
    def get_all(self):
        quizzes = list(self.collection.find({'isActive': True}).sort('createdAt', -1))
        for quiz in quizzes:
            quiz['_id'] = str(quiz['_id'])
        return quizzes
    
    def get_by_id(self, quiz_id):
        quiz = self.collection.find_one({'_id': ObjectId(quiz_id)})
        if quiz:
            quiz['_id'] = str(quiz['_id'])
            for question in quiz.get('questions', []):
                if '_id' in question:
                    question['_id'] = str(question['_id'])
        return quiz
    
    def get_by_id_with_answers(self, quiz_id):
        quiz = self.collection.find_one({'_id': ObjectId(quiz_id)})
        if quiz:
            quiz['_id'] = str(quiz['_id'])
            for question in quiz.get('questions', []):
                if '_id' in question:
                    question['_id'] = str(question['_id'])
        return quiz
    
    def delete(self, quiz_id):
        result = self.collection.delete_one({'_id': ObjectId(quiz_id)})
        return result.deleted_count > 0
