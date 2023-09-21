import {useState, useEffect} from "react"
import axios from "axios"
import AddTournament from "./AddTournamentPage";


function TournamentListPage() {
    const [tournaments, setTournaments] = useState([]);

    const getAllTournaments = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .get(
                `${import.meta.env.VITE_API_URL}/api/tournaments`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => setTournaments(response.data))
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getAllTournaments();
    }, []);


    return (
        <div className="TournamentList">

            <AddTournament refreshTournaments={getAllTournaments} />

            {tournaments.map((tournament) => (
                <TournamentCard key={tournament._id} {...tournaments} />
            ))}

        </div>
    );
}

export default TournamentListPage;