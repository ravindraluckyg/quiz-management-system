# Quiz Management System 🎓

A full-stack web application for creating, managing, and taking quizzes with automated grading and instant results.

![Quiz Management System](https://img.shields.io/badge/Python-Flask-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

---

## 📋 Features

### For Quiz Creators (Admin)
- Create quizzes with title and description
- Add three types of questions:
  - **Multiple Choice Questions (MCQ)** - 4 options
  - **True/False Questions**
  - **Text-based Questions**
- Set correct answers and points per question
- Add multiple questions dynamically

### For Quiz Takers (Students)
- View all available quizzes
- Take quizzes with interactive UI
- Submit answers with student name
- Get instant results with grade (A+, A, B, C, D, F)
- See correct answers vs submitted answers

### Grading System
- Automatic grading for MCQ and True/False questions
- Score percentage calculation
- Grade assignment based on performance:
  - A+: 90-100%
  - A: 80-89%
  - B: 70-79%
  - C: 60-69%
  - D: 50-59%
  - F: 0-49%

---

## 🛠️ Tech Stack

### Backend
- **Python 3.10+**
- **Flask 3.x** - Web framework
- **PyMongo** - MongoDB driver
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **CSS3** - Styling

### Database
- **MongoDB** - NoSQL database

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.10 or higher** - [Download](https://www.python.org/downloads/)
- **Node.js 18+ and npm** - [Download](https://nodejs.org/)
- **MongoDB 6.0+** - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/downloads)

### Verify Installation

```bash
python3 --version  # Should show Python 3.10+
node --version     # Should show v18+
npm --version      # Should show 9+
mongosh --version  # Should show MongoDB Shell
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ravindraluckyg/quiz-management-system.git
cd quiz-management-system
```

### Step 2: Start MongoDB

```bash
# Start MongoDB service
sudo systemctl start mongod

# Verify MongoDB is running
sudo systemctl status mongod

# Or start MongoDB manually
mongod --dbpath=/path/to/data/directory
```

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python3 run.py
```

Backend will start on: **http://localhost:5001**

### Step 4: Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on: **http://localhost:5173**

---

## 📂 Project Structure

```
quiz-management-system/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app initialization
│   │   ├── models.py            # Database models
│   │   ├── routes.py            # API routes
│   │   └── utils.py             # Utility functions (grading)
│   ├── config.py                # Configuration settings
│   ├── requirements.txt         # Python dependencies
│   └── run.py                   # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuizList.jsx     # Home page - list all quizzes
│   │   │   ├── CreateQuiz.jsx   # Admin - create new quiz
│   │   │   ├── TakeQuiz.jsx     # Student - take quiz
│   │   │   └── QuizResults.jsx  # Display results with grade
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Global styles
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── PLAN.md                      # Development plan and reflection
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5001/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/quizzes` | Get all quizzes | - |
| GET | `/quizzes/<id>` | Get quiz by ID | - |
| POST | `/quizzes` | Create new quiz | Quiz object |
| POST | `/quizzes/<id>/submit` | Submit quiz answers | Answers object |
| GET | `/submissions/<id>` | Get submission details | - |

### Example: Create Quiz

**POST** `/api/quizzes`

```json
{
  "title": "General Knowledge Quiz",
  "description": "Test your general knowledge",
  "questions": [
    {
      "type": "MCQ",
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris",
      "points": 10
    },
    {
      "type": "TRUE_FALSE",
      "question": "Python is a programming language",
      "options": [],
      "correctAnswer": "True",
      "points": 5
    },
    {
      "type": "TEXT",
      "question": "What is 2+2?",
      "options": [],
      "correctAnswer": "4",
      "points": 5
    }
  ]
}
```

### Example: Submit Quiz

**POST** `/api/quizzes/<quiz_id>/submit`

```json
{
  "studentName": "John Doe",
  "answers": [
    {
      "questionId": "question_id_1",
      "answer": "Paris"
    },
    {
      "questionId": "question_id_2",
      "answer": "True"
    },
    {
      "questionId": "question_id_3",
      "answer": "4"
    }
  ]
}
```

---

## 💻 Usage Guide

### Creating a Quiz

1. Open http://localhost:5173
2. Click **"Create New Quiz (Admin)"** button
3. Fill in:
   - Quiz title
   - Quiz description
4. Add questions:
   - Select question type (MCQ, True/False, or Text)
   - Enter question text
   - For MCQ: Add 4 options
   - Set correct answer
   - Assign points
5. Click **"Add Question"** to add more questions
6. Click **"Create Quiz"** to save

### Taking a Quiz

1. From home page, click **"Take Quiz"** on any quiz card
2. Read each question carefully
3. Select/enter your answers
4. Enter your name at the bottom
5. Click **"Submit Quiz"**
6. View your results instantly!

### Viewing Results

After submission, you'll see:
- Your grade (A+, A, B, C, D, F)
- Score (e.g., 15/20 - 75%)
- Detailed breakdown:
  - Correct answers in green
  - ❌ Incorrect answers in red with correct answer shown

---

## 🧪 Testing

### Test Backend API

```bash
# Get all quizzes
curl http://localhost:5001/api/quizzes

# Create a test quiz
curl -X POST http://localhost:5001/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Quiz",
    "description": "Testing",
    "questions": [{
      "type": "TRUE_FALSE",
      "question": "Is this a test?",
      "options": [],
      "correctAnswer": "True",
      "points": 10
    }]
  }'
```

### Manual Testing Checklist

- Create a quiz with all 3 question types
- Take the quiz and answer correctly
- Take the quiz and answer incorrectly
- Check grade calculation (A+, B, F, etc.)
- Verify results display correct/incorrect answers
- Test with empty quiz title (should show error)
- Test with no questions (should show error)
- Refresh page and verify data persists

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo journalctl -u mongod
```

### Backend Not Starting

```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Check Python version
python3 --version  # Should be 3.10+
```

### Frontend Not Loading

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try different port if 5173 is busy
npm run dev -- --port 3000
```

### Database Not Clearing

```bash
# Check which database your app uses
mongosh --eval "show dbs"

# Clear the correct database (replace 'quizdb' with your DB name)
mongosh quizdb --eval "db.quizzes.deleteMany({}); db.submissions.deleteMany({});"

# Verify cleared
mongosh quizdb --eval "db.quizzes.countDocuments()"
```

### CORS Errors

Ensure Flask-CORS is installed and configured:

```python
# In backend/app/__init__.py
from flask_cors import CORS
CORS(app)
```

### Port Already in Use

```bash
# Find process using port 5001
sudo lsof -i :5001

# Kill the process
kill -9 <PID>

# Or use different port
flask run --port 5002
```

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/config.py`:

```python
class Config:
    MONGO_URI = "mongodb://localhost:27017/quizdb"
    DEBUG = True
    PORT = 5001
```

### Frontend Configuration

Edit `frontend/src/App.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:5001/api';
```

---

## 📊 Database Schema

### Quizzes Collection

```javascript
{
  _id: ObjectId("..."),
  title: "Quiz Title",
  description: "Quiz Description",
  questions: [
    {
      type: "MCQ" | "TRUE_FALSE" | "TEXT",
      question: "Question text",
      options: ["option1", "option2", "option3", "option4"], // Empty for non-MCQ
      correctAnswer: "Correct answer",
      points: 10
    }
  ],
  createdAt: ISODate("2026-01-07T..."),
  isActive: true
}
```

### Submissions Collection

```javascript
{
  _id: ObjectId("..."),
  quizId: ObjectId("..."),
  studentName: "Student Name",
  answers: [
    {
      questionId: "...",
      submittedAnswer: "Student's answer",
      correctAnswer: "Correct answer",
      isCorrect: true,
      pointsEarned: 10
    }
  ],
  totalScore: 85,
  maxScore: 100,
  percentage: 85,
  grade: "A",
  submittedAt: ISODate("2026-01-07T...")
}
```

---

## 🎥 Demo Video

A complete demo video showing:
1. Creating a quiz with multiple question types
2. Taking the quiz
3. Viewing results with grades
4. Code walkthrough

[Link to demo video] - *Add your video link here*

---

## 🚀 Deployment

### Deploy Backend (Heroku Example)

```bash
# Install Heroku CLI
# Create Procfile
echo "web: gunicorn run:app" > Procfile

# Add gunicorn to requirements.txt
echo "gunicorn==21.2.0" >> requirements.txt

# Deploy
heroku create quiz-app-backend
heroku config:set MONGO_URI="your_mongodb_atlas_uri"
git push heroku main
```

### Deploy Frontend (Vercel Example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Update API_BASE_URL to deployed backend URL
```

### MongoDB Atlas (Cloud Database)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGO_URI` in backend config

---

## 📝 Development Notes

### Key Decisions

1. **No Authentication**: Focused on core quiz functionality for MVP
2. **Automatic Grading**: Instant feedback without manual review
3. **Simple UI**: Clean, intuitive design without CSS frameworks
4. **REST API**: Standard HTTP methods for CRUD operations

### Known Limitations

- No quiz editing/deletion in current version
- Text answers are case-sensitive
- No time limits on quizzes
- No user accounts or history tracking
- No pagination (shows all quizzes)

### Future Enhancements

See [PLAN.md](PLAN.md) for detailed roadmap including:
- User authentication
- Quiz management (edit/delete)
- Analytics and reporting
- Question banks
- Mobile app
- And more!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Ravindra Gautam**
- Software Engineer with 7.5+ years experience
- Specialization: PHP, Laravel, React, Full-stack development
- GitHub: [@ravindraluckyg]

---

## 🙏 Acknowledgments

- Flask documentation
- React documentation
- MongoDB documentation
- Vite for blazing-fast development
- The open-source community

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [PLAN.md](PLAN.md) for implementation details
3. Open an issue on GitHub

---

## 📈 Project Stats

- **Development Time**: ~4.5 hours
- **Lines of Code**: ~1500
- **Commits**: 8+
- **Languages**: Python, JavaScript, CSS
- **Components**: 4 React components
- **API Endpoints**: 5

---

**Made with ❤️ for education and learning**

*Star ⭐ this repo if you found it helpful!*
