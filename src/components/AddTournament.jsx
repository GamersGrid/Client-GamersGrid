import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
function AddTournament(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [games, setGames] = useState([]);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/games`)
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      prize,
      participants,
      game: selectedGame,
      dateTime,
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
        <Link to="/games/create">
          <button>
            Cant see your game ? <br />
            click on this link to add yours
          </button>
        </Link>
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
