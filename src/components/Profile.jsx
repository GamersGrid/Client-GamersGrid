import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../App.css";

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
      <h2> Your Tournaments </h2>
      {userTournaments.length === 0 ? (
        <p>No tournaments created by this user</p>
      ) : (
        <ul>
          {userTournaments.map((tournament) => (
            <li key={tournament._id}>
      <h2>User's Tournaments</h2>
      <div className="tournament-grid">
        {userTournaments.length === 0 ? (
          <p>No tournaments created by this user.</p>
        ) : (
          userTournaments.map((tournament) => (
            <div key={tournament._id} className="tournament-card">
              <h3>{tournament.title}</h3>
              <p>{tournament.description}</p>
              <Link to={`/tournaments/edit/${tournament._id}`}>Edit Tournament</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;