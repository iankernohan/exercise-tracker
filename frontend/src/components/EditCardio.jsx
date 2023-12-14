import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCardio({ exercise }) {
  const [name, setName] = useState(exercise.name);
  const [duration, setDuration] = useState(exercise.duration);
  const [date, setDate] = useState(new Date(exercise.date));
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleUpdateExercise(e) {
    try {
      e.preventDefault();
      await axios({
        method: "PUT",
        data: {
          name,
          duration,
          date,
        },
        url: `http://localhost:8000/cardioExercise/${id}`,
        withCredentials: true,
      });
      console.log("Exercise Updated");
      navigate("/");
    } catch (e) {
      console.log(`Updating exercise error: ${e}`);
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

      <button className="button py-4 my-4 w-25" onClick={handleUpdateExercise}>
        Update
      </button>
    </form>
  );
}
