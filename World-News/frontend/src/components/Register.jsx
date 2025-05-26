import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const containerBase = {
  maxWidth: 420,
  margin: "60px auto",
  padding: 36,
  borderRadius: 16,
  backgroundColor: "rgba(10, 10, 15, 0.8)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.9)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#fff",
  transition: "transform 0.3s ease, background 0.3s ease",
};

const containerHover = {
  transform: "scale(1.025)",
  background:
    "linear-gradient(135deg, rgba(15,15,20,0.9), rgba(5,5,10,0.95))",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const labelStyle = {
  fontWeight: "600",
  fontSize: "0.95rem",
  color: "#ddd",
};

const inputStyle = {
  padding: "12px 14px",
  fontSize: "1rem",
  borderRadius: 8,
  border: "1px solid #333",
  backgroundColor: "transparent",
  color: "#eee",
  outline: "none",
  transition: "all 0.3s ease",
  boxShadow: "inset 0 0 4px rgba(255,255,255,0.05)",
};

const inputFocusStyle = {
  borderColor: "#38a3d1",
  boxShadow: "0 0 0 2px rgba(56, 163, 209, 0.3)",
};

const buttonStyle = {
  padding: "12px",
  fontSize: "1.1rem",
  fontWeight: "700",
  borderRadius: 10,
  border: "none",
  color: "#fff",
  background:
    "linear-gradient(135deg, #3a0ca3, #4361ee, #4cc9f0)",
  boxShadow: "0 4px 16px rgba(76, 201, 240, 0.2)",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const buttonHoverStyle = {
  background:
    "linear-gradient(135deg, #4cc9f0, #4361ee, #3a0ca3)",
  transform: "scale(1.05)",
  boxShadow: "0 6px 24px rgba(76, 201, 240, 0.4)",
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
  const [hovered, setHovered] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
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
    <main
      style={{
        ...containerBase,
        ...(hovered ? containerHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Register</h2>
      {error && <p style={{ ...messageStyle, color: "#ff6b6b" }}>{error}</p>}
      {success && <p style={{ ...messageStyle, color: "#6bcf6b" }}>{success}</p>}
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="username">
          Username:
        </label>
        <input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ ...inputStyle, ...(usernameFocus ? inputFocusStyle : {}) }}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />

        <label style={labelStyle} htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, ...(emailFocus ? inputFocusStyle : {}) }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />

        <label style={labelStyle} htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, ...(passwordFocus ? inputFocusStyle : {}) }}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />

        <button
          type="submit"
          style={{ ...buttonStyle, ...(hoverButton ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default Register;
