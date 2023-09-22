import {useState, useEffect} from "react"
import axios from "axios"
import TournamentCard from "../components/TournamentCard";


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


    const tournamentsList = tournaments.map((tournament) =>{ 
        console.log(tournamentsList)
        return(
        <div key={tournament._id}>
                <h3>{tournament.title}</h3>
                <h3>{tournament.description}</h3>
            </div>)
    })
    return (
        <>
        {tournaments ?  : <p>loading....</p>  })
        </>
        }

export default TournamentListPage;