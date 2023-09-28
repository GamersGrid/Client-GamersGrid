import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        tournaments.map((tournament) => (
          <TournamentCard key={tournament._id} {...tournament} />
        ))
      )}
    </div>
  );
}

export default TournamentListPage;
