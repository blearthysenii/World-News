// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsList from './components/NewsList';
import NewsDetails from './components/NewsDetails';
import Comments from './components/Comments';
import Login from './components/Login';
import Register from './components/Register';

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainContentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
};

const contentWrapperStyle = {
  flexGrow: 1,
  width: '100%',
  maxWidth: '1200px',   // max gjerësia e përmbajtjes
  margin: '0 auto',     // qendro përmbajtjen
  padding: '20px',      // hapësirë rreth përmbajtjes
  boxSizing: 'border-box',
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={appContainerStyle}>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main style={mainContentStyle}>
        <div style={contentWrapperStyle}>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
