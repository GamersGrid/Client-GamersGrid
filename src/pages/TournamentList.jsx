import {useState, useEffect} from "react"
import axios from "axios"


function TournamentList() {
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

            <AddProject refreshProjects={getAllTournaments} />

            {projects.map((project) => (
                <ProjectCard key={project._id} {...project} />
            ))}

        </div>
    );
}

export default TournamentList;