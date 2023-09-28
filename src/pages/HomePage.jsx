import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
    return (
        <div className="HomePage">
            <h1 className="main-heading move-text">-GG-</h1>
            <p className="main-heading2 move-text">your game - our grind</p>
            <Link to="/addtournament">
                <button className="main-button">Create your Tournament</button>
            </Link>
        </div>
    );
}

export default HomePage;
