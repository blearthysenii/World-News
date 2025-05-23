//Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  maxWidth: 400,
  margin: '50px auto',
  padding: 30,
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  backgroundColor: '#f9f9f9',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const labelStyle = {
  fontWeight: '600',
  fontSize: '1rem',
};

const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: 5,
  border: '1px solid #ccc',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const inputFocusStyle = {
  borderColor: '#1e90ff',
};

const buttonStyle = {
  padding: '12px',
  fontSize: '1.1rem',
  backgroundColor: '#1e90ff',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontWeight: '700',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#1565c0',
};

const errorStyle = {
  color: 'red',
  fontWeight: '600',
  textAlign: 'center',
};

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        console.log('Login successful', data);
        onLoginSuccess();
        localStorage.setItem('token', data.token);
        navigate('/news');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Login</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ ...inputStyle, ...(emailFocused ? inputFocusStyle : {}) }}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
        />

        <label style={labelStyle} htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
