import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../App.css'; 

function EditTournamentPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { tournamentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`)
            .then((response) => {
                const tournament = response.data;
                setTitle(tournament.title);
                setDescription(tournament.description);
            })
            .catch((error) => console.log(error));

    }, [tournamentId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description };

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`, requestBody)
            .then((response) => {
                navigate(`/tournaments/${tournamentId}`)
            });
    };


    const deleteTournament = () => {

        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`)
            .then(() => {
                navigate("/tournaments");
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="EditTournamentPage">
            <h3>Edit the Tournament</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="button-container">
                        <button type="submit">Update Tournament</button>
                        <button onClick={deleteTournament}>Delete Tournament</button>
                    </div>
                </form>
            </div>
        );
    }

export default EditTournamentPage;
