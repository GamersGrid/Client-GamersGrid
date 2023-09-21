import { useState } from "react";
import axios from "axios";

function AddTournament(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [participants, setParticipants] = useState("");
  const [game, setGame] = useState("");
  const [rules, setRules] = useState("");
  const [timezone, setTimezone] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      format,
      participants,
      game,
      rules,
      timezone,
      date,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/tournaments`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        setFormat("");
        setParticipants("");
        setGame("");
        setRules("");
        setTimezone("");
        setDate("");

        props.refreshTournaments();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTournament">
      <h3>Add Tournament</h3>

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

          <label>Format:</label>
          <input
            type="text"
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />

          <label>Participants:</label>
          <input
            type="number"
            name="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />

          <label>Game:</label>
          <input
            type="text"
            name="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          />

          <label>Rules:</label>
          <input
            type="text"
            name="rules"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>TimeZone:</label>
          <input
            type="text"
            name="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddTournament;
