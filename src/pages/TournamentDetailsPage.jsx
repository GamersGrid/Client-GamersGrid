import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import TournamentCard from "../components/TournamentCard";
import '../App.css';

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

                    <TournamentCard
                        game={tournament.game}
                        title={tournament.title}
                        description={tournament.description}
                        prize={tournament.prize}
                        participants={tournament.participants}
                        dateTime={tournament.dateTime}
                        _id={tournament._id}
                    />
                </>
            )}

            <div className="button-container">
                <Link to="/tournaments">
                    <button>Back to Tournament List</button>
                </Link>

                {isAuthor && (
                    <Link to={`/tournaments/edit/${tournamentId}`}>
                        <button>Edit Tournament</button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default TournamentDetailsPage;
