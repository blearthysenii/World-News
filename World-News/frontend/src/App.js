// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsList from './components/NewsList';
import NewsDetails from './components/NewsDetails';
import Comments from './components/Comments';  // importo Comments
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/news"
          element={
            isLoggedIn ? <NewsList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/news/:id"
          element={
            isLoggedIn ? <NewsDetails /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/comments/:id"
          element={
            isLoggedIn ? <Comments /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/news" : "/login"} replace />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
