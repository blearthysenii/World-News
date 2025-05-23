import React from 'react';
import { Link } from "react-router-dom";

const headerStyle = {
  backgroundColor: "#1a1a1a",
  color: "white",
  padding: "23px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.19)",
  marginBottom: "30px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.5rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
};

const navStyle = {
  display: "flex",
  gap: "15px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const linkHoverStyle = {
  textDecoration: "underline",
};




const Header = ({ isLoggedIn, onLogout }) => (
  <header style={headerStyle}>
    <h1 style={titleStyle}>World News</h1>
    <nav style={navStyle}>
      {isLoggedIn && (
        <>
          <Link to="/news" style={linkStyle}>News</Link>
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={onLogout}>Logout</button>

        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
        </>
      )}
    </nav>
  </header>
);


export default Header;

