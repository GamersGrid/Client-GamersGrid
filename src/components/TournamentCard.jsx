import { Link } from "react-router-dom";

function TournamentCard({ title, description, _id }) {

    return (
        <div className="ProjectCard card">
           <Link to={`/api/games`}>
                <h3>{title}</h3>
                <h3>{description}</h3>
            </Link>
            
            <Link to={`/tournaments/${_id}`}>
                <h3>{title}</h3>
                <h3>{description}</h3>
            </Link>
            
        </div>
    );
}

export default TournamentCard;