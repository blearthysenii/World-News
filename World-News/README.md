# World News

## Project Description
This is a simple web application for publishing news articles and commenting on them. Users can register, log in, view news articles, post new news, and add comments to each article.

The application uses Node.js, Express, MongoDB, and EJS templating engine.

---

## Key Features
- User registration and authentication using email and password (hashed with bcrypt)
- JWT-based session management and authorization
- Authorized users can add new news articles
- Display news articles with a list of comments for each article
- Logged-in users can post comments
- Comments and news lists support vertical scrolling for ease of navigation
- Middleware for protecting sensitive routes
- Cookie parser used for storing JWT tokens in HTTP-only cookies

---

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- EJS (Embedded JavaScript Templates)
- bcryptjs (for password hashing)
- jsonwebtoken (JWT for authentication)
- cookie-parser (cookie management)
- express-ejs-layouts (for layout support in EJS)

---

## Project Structure
/config
db.js # MongoDB connection configuration
/models
User.js # User model
News.js # News model
Comment.js # Comment model
/routes
authRoutes.js # Routes for registration and login
newsRoutes.js # Routes for news articles
commentRoutes.js# Routes for comments
/middleware
authMiddleware.js # Middleware to verify JWT token
/views # EJS templates
/public # Static files such as CSS, JS, images
server.js # Main server entry point
.env # Environment variables (JWT_SECRET, MongoDB URI, PORT)

# How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/username/world-news-app.git
   cd world-news-app

   Install dependencies:

    npm install 

    Start the server:
    npm start
     
    Open your browser at http://localhost:5000
    
    
    Authentication Flow
Users register with username, email, and password.

Passwords are securely hashed with bcrypt.

On login, a JWT token is generated and stored in an HTTP-only cookie.

authMiddleware protects routes that require authorization.

res.locals.user is used in EJS templates to access logged-in user info.

Comments Functionality
Comments are stored in the database with references to the related news article and author.

The comment list container supports vertical scrolling for easier viewing of many comments.

The comment textarea allows scrolling within itself if the content is long.

Possible Improvements
Advanced validation on both front-end and back-end

Adding editing and deleting functionality for news and comments

Front-end framework integration for better interactivity

Pagination for news articles and comments

Role-based access control (e.g., admin, regular user)

For questions or suggestions, feel free to contact me!

Bleart Hyseni
May 2025
