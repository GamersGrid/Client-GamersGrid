import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

function TournamentDetails({
  game,
  title,
  description,
  prize,
  participants,
  dateTime,
  _id,
}) {
  const [gameImage, setGameImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/games/${game}`)
      .then((response) => {
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
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="tournament-card">
      <Link to={`/tournaments/${_id}`} className="tournament-link">
        {gameImage && (
          <div className="image-container">
            <img
              src={gameImage}
              alt="Game Image"
              className="tournament-image"
            />
          </div>
        )}
        <h3 className="tournament-title">{title}</h3>
        <p className="tournament-details">Description: {description}</p>
        <p className="tournament-details">Prize: {prize}</p>
        <p className="tournament-details">Participants: {participants}</p>
        <p className="tournament-details">{formatDateTime(dateTime)}</p>
      </Link>
    </div>
  );
}

export default TournamentDetails;
