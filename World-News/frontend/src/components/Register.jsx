import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // importo useNavigate

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // inicializo useNavigate

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

      // Ridrejto pas 2 sekondash tek faqja e login
      setTimeout(() => {
        navigate("/Login");
      }, 2000);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "60px auto", padding: 40, background: "white", borderRadius: 30 }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

        <button
          type="submit"
          style={{ backgroundColor: "#2980b9", color: "white", padding: 10, borderRadius: 6, border: "none", marginTop: 20 }}
        >
          Register
        </button>
      </form>
    </main>
  );
}

export default Register;
