from bson import ObjectId
from datetime import datetime

class Submission:
    def __init__(self, db):
        self.collection = db['submissions']
    
    def create(self, data):
        data['submittedAt'] = datetime.utcnow()
        result = self.collection.insert_one(data)
        return str(result.inserted_id)
    
    def get_by_id(self, submission_id):
        submission = self.collection.find_one({'_id': ObjectId(submission_id)})
        if submission:
            submission['_id'] = str(submission['_id'])
        return submission
