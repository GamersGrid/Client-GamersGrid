import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import TournamentCard from "../components/TournamentCard";


function tournamentListPage() {
    const [tournaments, settournaments] = useState([]);

    const getAlltournaments = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/api/tournaments`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => settournaments(response.data))
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAlltournaments();
    }, []);


    return (
        <div className="tournament-list">
            {tournaments.map((tournament) => (
                <TournamentCard key={tournament._id} {...tournament} />
            ))}

        </div>
    );
}

export default tournamentListPage;