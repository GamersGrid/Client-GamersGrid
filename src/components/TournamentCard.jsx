import { Link } from "react-router-dom";

function TournamentCard({ title, _id }) {

    return (
        <div className="ProjectCard card">
            <Link to={`/tournaments/${_id}`}>
                <h3>{title}</h3>
            </Link>
            
        </div>
    );
}

export default TournamentCard;