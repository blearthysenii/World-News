World News Backend API
This is the backend for a World News application built with Node.js, Express, and MongoDB. It provides user authentication, news management, and commenting functionality via a RESTful API.

Features
User registration and login with JWT authentication

Create, read, update, and delete news articles

Add and retrieve comments on news articles

Secure routes protected with authentication middleware

Technologies Used
Node.js

Express.js

MongoDB with Mongoose

JSON Web Tokens (JWT)

bcryptjs for password hashing

dotenv for environment variables

Project Structure

backend/
│
├── config/
│   └── db.js            # MongoDB connection setup
├── middleware/
│   └── authMiddleware.js # JWT authentication middleware
├── models/
│   ├── User.js          # User schema
│   ├── News.js          # News article schema
│   └── Comment.js       # Comment schema
├── routes/
│   ├── authRoutes.js    # Authentication routes (register, login)
│   ├── newsRoutes.js    # News CRUD routes
│   └── commentRoutes.js # Comment routes
├── .env                 # Environment variables
├── server.js            # Main server file
└── package.json

Environment Variables (.env)

PORT=5000
MONGO_URI=mongodb://localhost:27017/worldNewsDB
JWT_SECRET=myverysecretkey

Installation & Setup

npm install
npm start

API Endpoints
Authentication
POST /api/auth/register — Register a new user

POST /api/auth/login — Login and receive JWT token

News
POST /api/news — Create a news article (Auth required)

GET /api/news — Get all news articles

GET /api/news/:id — Get a news article by ID

PUT /api/news/:id — Update a news article (Auth required, only author)

DELETE /api/news/:id — Delete a news article (Auth required, only author)

Comments
GET /api/comments/news/:newsId — Get all comments for a news article

POST /api/comments/news/:newsId — Add a comment to a news article (Auth required)

Authentication Middleware
Protects routes by validating JWT tokens sent in the Authorization header.

Testing
Use Postman or similar tools to test the API. Example requests:

Register User

Login User (get JWT)

Create News with JWT

Fetch News and Comments

Add Comment with JWT