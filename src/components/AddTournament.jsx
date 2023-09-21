import { useState } from "react";
import axios from "axios";

function AddTournament(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title };

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${import.meta.env.VITE_API_URL}/api/tournaments`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Reset the state
                setTitle("");
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




                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTournament;