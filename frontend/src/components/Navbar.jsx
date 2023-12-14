import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar({ user, setUser, setExercises }) {
  async function handleLogout() {
    const loggedOutUser = await axios.post("http://localhost:8000/user/logout");
    setUser(null);
    setExercises([]);
    console.log(loggedOutUser);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ExerciseTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Exercises
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addExercise">
                    + Exercise
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item justify-self-end">
                  <Link className="nav-link" to={`/userInfo`}>
                    Hi, {user.username}!
                  </Link>
                </li>
                <li className="nav-item justify-self-end">
                  <Link className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item justify-self-end">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item justify-self-end">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
