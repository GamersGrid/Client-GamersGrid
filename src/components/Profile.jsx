import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../App.css";
import TournamentCard from "./TournamentCard"; 

function UserProfile() {
  const { user } = useContext(AuthContext);
  const [userTournaments, setUserTournaments] = useState([]);
console.log({user})
  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/tournaments`)
        .then((response) => {
          const allTournaments = response.data;

          const userCreatedTournaments = allTournaments.filter(
            (tournament) => tournament.author === user._id
          );

          setUserTournaments(userCreatedTournaments);
        })
        .catch((error) => {
          console.error("Error fetching tournaments:", error);
        });
    }
  }, [user]);
  return (
    <div className="UserProfile">
      <h2>{user.username} Tournaments</h2>
      <div className="tournament-grid">
        {userTournaments.length === 0 ? (
          <p>No tournaments created by this user.</p>
        ) : (
          userTournaments.map((tournament) => (
            <TournamentCard
              key={tournament._id}
              game={tournament.game}
              title={tournament.title}
              participants={tournament.participants}
              dateTime={tournament.dateTime}
              _id={tournament._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;