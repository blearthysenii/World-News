import React from 'react';
import { Link } from "react-router-dom";

const headerStyle = {
  backgroundColor: "#1a1a1a",
  color: "white",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  marginBottom: "30px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.8rem",
  fontWeight: "700",
  letterSpacing: "1px",
  userSelect: "none",
  cursor: "default",
};

const navStyle = {
  display: "flex",
  gap: "25px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  padding: "6px 12px",
  borderRadius: "6px",
  transition: "background-color 0.3s, color 0.3s",
};

const linkHoverStyle = {
  backgroundColor: "#333",
  color: "#1e90ff",
};

const buttonStyle = {
  backgroundColor: "#e63946",
  border: "none",
  color: "white",
  fontWeight: "600",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "#d62828",
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLink: null,
      hoverButton: false,
    };
  }

  render() {
    const { isLoggedIn, onLogout } = this.props;
    const { hoverLink, hoverButton } = this.state;

    return (
      <header style={headerStyle}>
        <h1 style={titleStyle}>World News</h1>
        <nav style={navStyle}>
          {isLoggedIn ? (
            <>
              <Link
                to="/news"
                style={{
                  ...linkStyle,
                  ...(hoverLink === 'news' ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => this.setState({ hoverLink: 'news' })}
                onMouseLeave={() => this.setState({ hoverLink: null })}
              >
                News
              </Link>
              <button
                style={{
                  ...buttonStyle,
                  ...(hoverButton ? buttonHoverStyle : {}),
                }}
                onClick={onLogout}
                onMouseEnter={() => this.setState({ hoverButton: true })}
                onMouseLeave={() => this.setState({ hoverButton: false })}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  ...linkStyle,
                  ...(hoverLink === 'login' ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => this.setState({ hoverLink: 'login' })}
                onMouseLeave={() => this.setState({ hoverLink: null })}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  ...linkStyle,
                  ...(hoverLink === 'register' ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => this.setState({ hoverLink: 'register' })}
                onMouseLeave={() => this.setState({ hoverLink: null })}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
