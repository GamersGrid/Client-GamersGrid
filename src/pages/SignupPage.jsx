import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import your CSS file here

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUserName = (e) => setUserName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, username };

        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log(error);
                console.log(error.response.data.message);
                setErrorMessage(errorDescription);
            });
    };

    return (
        <div className="SignupPage">
            <h1 className="signup-heading">Sign Up</h1>

            <form onSubmit={handleSignupSubmit} className="signup-form">
                <label className="signup-label">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className="signup-input"
                />

                <label className="signup-label">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className="signup-input"
                />

                <label className="signup-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUserName}
                    className="signup-input"
                />

                <button type="submit" className="signup-button">
                    Sign Up
                </button>
            </form>

            {errorMessage && (
                <p className="signup-error">{errorMessage}</p>
            )}

            <p className="signup-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
