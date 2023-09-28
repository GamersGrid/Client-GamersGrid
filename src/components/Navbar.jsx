import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../images/hierarchy.png";
import "../App.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <Link to="/tournaments" className="navbar-link">
           |    Tournaments
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/addtournament" className="navbar-link">
             | Create Tournament
            </Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {!isLoggedIn && (
          <>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="navbar-link">
              Profile |
            </Link>
            <Link to="/" className="homepage">
              <button onClick={logOutUser} className="logout-button">
                Logout
              </button>
            </Link>
            <span className="user-name">{user && user.name}</span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
