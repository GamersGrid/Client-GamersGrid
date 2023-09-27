import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function TournamentDetailsPage(props) {
    const [tournament, setTournament] = useState(null);
    const { user } = useContext(AuthContext);
    const { tournamentId } = useParams();

    const getTournament = () => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneTournament = response.data;
                setTournament(oneTournament);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getTournament();
    }, []);

   
    const isAuthor = tournament && user && tournament.author === user._id;

    return (
        <div className="TournamentDetails">
            {tournament && (
                <>
                    <h1>{tournament.title}</h1>
                    <p>{tournament.description}</p>
                </>
            )}

            <Link to="/tournaments">
                <button>Back to tournaments</button>
            </Link>

            {isAuthor && (
                <Link to={`/tournaments/edit/${tournamentId}`}>
                    <button>Edit tournament</button>
                </Link>
            )}
        </div>
    );
}

export default TournamentDetailsPage;




