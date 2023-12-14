import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    try {
      e.preventDefault();
      const user = await axios({
        method: "POST",
        data: {
          username,
          password,
        },
        withCredentials: true,
        url: "http://localhost:8000/user/login",
      });
      console.log(user.data);
      setUser(user.data);
      setIsError(false);
      navigate("/");
    } catch (err) {
      console.log("Could not log in: " + err);
      setIsError(true);
      navigate("/login");
    }
  }

  return (
    <div className="container d-flex flex-column w-50 mt-5 bgborder">
      <h1 className="align-self-center">Login</h1>
      <form className="d-flex flex-column">
        <div>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setIsError(false);
              setUsername(e.target.value);
            }}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setIsError(false);
              setPassword(e.target.value);
            }}
            required
          />
        </div>

        {isError && (
          <div className="align-self-center mt-2" style={{ color: "red" }}>
            {username && password
              ? "Incorrect username or password."
              : "Please fill out all fields."}
          </div>
        )}

        <button
          className="align-self-center button py-4 m-3"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}
