import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../context/auth.context";

function EditTournamentPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [games, setGames] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const { user } = useContext(AuthContext);
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`)
      .then((response) => {
        const tournament = response.data;

        if (user._id === tournament.author) {
          setTitle(tournament.title);
          setDescription(tournament.description);
          setPrize(tournament.prize);
          setParticipants(tournament.participants);
          setSelectedGame(tournament.game);
          setDateTime(tournament.dateTime);
          props.refreshTournaments();
        } else {
          navigate(`/tournaments/${tournamentId}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((response) => {
        const gameData = response.data;
        setGames(gameData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tournamentId, user, navigate, props]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      description,
      prize,
      participants,
      game: selectedGame,
      dateTime,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`,
        requestBody
      )
      .then(() => {
        navigate(`/tournaments/${tournamentId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTournament = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`)
      .then(() => {
        navigate("/tournaments");
      })
      .catch((error) => {
        console.error(error);
      });
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

        <div className="form-column">
          <label>Prize:</label>
          <input
            type="text"
            name="prize"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
          />
          <label>Participants:</label>
          <input
            type="text"
            name="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-column">
            <label>Game:</label>
            <select
              name="game"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value="">Select a game</option>
              {games.map((game) => (
                <option key={game._id} value={game._id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-column">
            <label>Date and time:</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>

        <div className="button-container">
          <button type="submit">Update Tournament</button>
          <button onClick={deleteTournament}>Delete Tournament</button>
        </div>
      </form>
    </div>
  );
}

export default EditTournamentPage;
