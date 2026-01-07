from flask import Flask
from flask_cors import CORS
from app.config.database import init_db
from app.routes.quiz_routes import quiz_bp
from app.routes.submission_routes import submission_bp

def create_app():
    app = Flask(__name__)
    
    # Enable CORS - allow all origins
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    init_db()
    
    app.register_blueprint(quiz_bp, url_prefix='/api/quizzes')
    app.register_blueprint(submission_bp, url_prefix='/api/submissions')
    
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'OK', 'message': 'Quiz API is running'}
    
    return app
