import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";

function AddTournament(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [games, setGames] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(dateTime).toISOString(); // Convert selected date to ISO format
    const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format

    if (selectedDate < currentDateTime) {
      // Check if selected date is in the past
      alert("Please select a future date and time.");
      return;
    }

    const requestBody = {
      title,
      description,
      prize,
      participants,
      game: selectedGame,
      dateTime: selectedDate, // Use selectedDate instead of dateTime
      author: user._id,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/tournaments`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setPrize("");
        setParticipants("");
        setSelectedGame("");
        setDateTime("");
        navigate("/tournaments");
        props.refreshTournaments();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="AddTournament">
      <h3>Add Tournament</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

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
              min={today} // Set the minimum date to today
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
        </div>

        <Link to="/games/create">
          <button>
            Can't see your game? <br />
            Click on this button to add yours
          </button>
        </Link>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTournament;
