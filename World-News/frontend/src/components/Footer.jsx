// src/components/Footer.jsx
import React from "react";

const footerStyle = {
  backgroundColor: "#1a1a1a",
  color: "#ccc",
  padding: "15px 30px",
  textAlign: "center",
  marginTop: "auto",
  fontSize: "0.9rem",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxShadow: "0 -2px 6px rgba(0,0,0,0.2)",
  userSelect: "none",
};

const Footer = () => (
  <footer style={footerStyle}>
    &copy; 2025 World News. All rights reserved.
  </footer>
);

export default Footer;
