import { Link } from "react-router-dom";
import "../styles/LoginPrompt.css";

export default function LoginPrompt() {
  return (
    <div
      className="container d-flex flex-column align-items-center bgborder"
      id="login-prompt"
    >
      <Link to={"/login"} style={{ textDecoration: "none" }}>
        <button className="button">Login</button>
      </Link>
      <p>or</p>
      <Link to={"/register"} style={{ textDecoration: "none" }}>
        <button className="button">Register</button>
      </Link>
      <p>to start tracking exercises!</p>
    </div>
  );
}
