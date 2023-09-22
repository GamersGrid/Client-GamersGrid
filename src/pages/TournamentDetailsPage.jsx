import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";



function TournamentDetailsPage(props) {
    const [tournament, setTournament] = useState(null);

    const { tournamentId } = useParams();

    const getTournament = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/api/tournaments/${tournamentId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneTournament= response.data;
                setTournament(oneTournament);
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getTournament();
    }, []);


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

            <Link to={`/tournaments/edit/${tournamentId}`}>
                <button>Edit tournament</button>
            </Link>

        </div>
    );
}

export default TournamentDetailsPage;





