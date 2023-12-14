import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CardioForm({ user, setUser }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  async function handleAddExercise(e) {
    try {
      e.preventDefault();
      const post = await axios({
        method: "POST",
        data: {
          name,
          duration,
          date,
          user,
        },
        url: "http://localhost:8000/cardioExercise/",
        withCredentials: true,
      });
      console.log(post);
      navigate("/");
    } catch (e) {
      console.log("Could not add Cardio Exercise.");
    }
  }

  return (
    <form className="d-flex flex-column w-50 m-auto mt-5 bgborder">
      <div className="my-2">
        <label className="form-label" htmlFor="name">
          Exercise Name
        </label>
        <input
          className="form-control"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          required
        />
      </div>
      <div className="my-2">
        <label className="form-label" htmlFor="duration">
          Exercise Duration (mins)
        </label>
        <input
          className="form-control w-75"
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="my-2">
        <div>
          <label className="form-label" htmlFor="date">
            Date
          </label>
        </div>
        <DatePicker
          className="form-control"
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          required
        />
      </div>

      <button className="button my-4 w-25 py-4" onClick={handleAddExercise}>
        Add
      </button>
    </form>
  );
}
