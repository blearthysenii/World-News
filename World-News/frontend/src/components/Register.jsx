import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  maxWidth: 500,
  margin: "60px auto",
  padding: 40,
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const labelStyle = {
  fontWeight: "600",
  fontSize: "1rem",
  marginBottom: 6,
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: 6,
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.3s",
};

const inputFocusStyle = {
  borderColor: "#2980b9",
};

const buttonStyle = {
  backgroundColor: "#2980b9",
  color: "white",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  fontWeight: "700",
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "#216092",
};

const messageStyle = {
  textAlign: "center",
  fontWeight: "600",
};

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Register</h2>
      {error && <p style={{ ...messageStyle, color: "red" }}>{error}</p>}
      {success && <p style={{ ...messageStyle, color: "green" }}>{success}</p>}
      <form style={formStyle} onSubmit={handleSubmit}>

        <label style={labelStyle} htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ ...inputStyle, ...(usernameFocused ? inputFocusStyle : {}) }}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />

        <label style={labelStyle} htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, ...(emailFocused ? inputFocusStyle : {}) }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <label style={labelStyle} htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, ...(passwordFocused ? inputFocusStyle : {}) }}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
        />

        <button
          type="submit"
          style={{ ...buttonStyle, ...(isButtonHovered ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default Register;
