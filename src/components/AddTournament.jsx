import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function AddTournament(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedGame, setSelectedGame] = useState(""); // Store the selected game separately
  const [games, setGames] = useState([]); // Store the list of games
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      prize,
      participants,
      game: selectedGame, // Use the selectedGame state
      dateTime,
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
        setSelectedGame(""); // Clear selected game
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
        <label>Game:</label>
        <select
          name="game"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)} // Update selectedGame, not the entire game state
        >
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game._id} value={game._id}>
              {game.title}
            </option>
          ))}
        </select>
        <label>Date and time:</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTournament;