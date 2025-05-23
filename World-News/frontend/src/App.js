import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NewsList from "./components/NewsList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

      <Routes>
        <Route
          path="/Login"
          element={
            isLoggedIn ? (
              <Navigate to="/NewsList" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/Register"
          element={
            isLoggedIn ? <Navigate to="/NewsList" /> : <Register />
          }
        />
        <Route
          path="/NewsList"
          element={
            isLoggedIn ? <NewsList /> : <Navigate to="/Login" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/NewsList" : "/Login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
