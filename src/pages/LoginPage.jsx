import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../App.css"; // Import your CSS file here

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1 className="login-heading">Login</h1>

      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="form-group">
          <label className="login-label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="login-input"
          />
        </div>

        <div className="form-group">
          <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="login-input"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {errorMessage && <p className="login-error">{errorMessage}</p>}

      <p className="login-link">
        Don't have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
