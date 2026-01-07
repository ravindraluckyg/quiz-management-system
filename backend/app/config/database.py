from pymongo import MongoClient
import os

def get_db():
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
    db = client['quizdb']
    return db

def init_db():
    try:
        db = get_db()
        db.command('ping')
        print('✓ MongoDB Connected')
        return db
    except Exception as e:
        print(f'✗ MongoDB Connection Error: {e}')
        return None
