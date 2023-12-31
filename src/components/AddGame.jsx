import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AddGames(props) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(""); 

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const defaultImage = "https://static-cdn.jtvnw.net/ttv-boxart/498566-285x380.jpg";
        const requestBody = {
            title,
            type,
            image: image || defaultImage, 
        };

        const storedToken = localStorage.getItem("authToken");

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/games/create`, requestBody, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setTitle("");
                setType("");
                setImage("");
                navigate("/addtournament");
                props.refreshGames();
            })
            .catch((error) => console.log(error));
    };

    const enumOptions = [
        "Fighting Games",
        "Racing Games",
        "Sports Games",
        "Digital Card Games",
        "Real-Time Strategy",
        "First-Person Shooter",
        "Third-Person Shooter",
        "Multiplayer Online Battle Arena",
        "Battle-Royale",
    ];

    return (
        <div className="AddGames">
            <h3> - Add Game -</h3>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Type</label>
                <select
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Select a type</option>
                    {enumOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <label>Image</label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    placeholder="URL Link"
                    onChange={(e) => setImage(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddGames;
