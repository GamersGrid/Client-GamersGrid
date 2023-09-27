import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function TournamentCard({ game, title, participants, dateTime, _id }) {
    const [gameImage, setGameImage] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/games/${game}`).then((response) => {
            setGameImage(response.data.image);
        });
    }, []);


    const formatDateTime = (isoDateTime) => {
        const date = new Date(isoDateTime);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
        };
        return (
            date.toLocaleDateString("en-US", options)
        );
    };


    return (
        <div className="tournament card">
            <Link to={`/tournaments/${_id}`}>
                {gameImage && <img src={gameImage} alt="Game Image" />}
                <h3>{title}</h3>
                <h3>{participants}</h3>
                <h3>{formatDateTime(dateTime)}</h3>
            </Link>
        </div>
    );
}

export default TournamentCard;
