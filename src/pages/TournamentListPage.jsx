import React, { useState, useEffect } from "react";
import axios from "axios";

import TournamentCard from "../components/TournamentCard";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function TournamentListPage() {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTournaments = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/tournaments`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTournaments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllTournaments();
  }, []);

  return (
    <div className="tournament-list">
      <h2>-Tournament - List-</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="tournament-cards">
          {tournaments.map((tournament) => (
            <TournamentCard key={tournament._id} {...tournament} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TournamentListPage;
