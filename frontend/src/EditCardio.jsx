import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCardio() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getExercise() {
      const exercise = await axios.get(
        `http://localhost:8000/cardioExercise/${id}`
      );
      setName(exercise.data.name);
      setDuration(exercise.data.duration);
      setDate(new Date(exercise.data.date));
    }
    getExercise();
  }, [id]);

  async function handleUpdateExercise(e) {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:8000/cardioExercise/${id}`, {
        name,
        duration,
        date,
      });
      console.log("Exercise Updated");
      navigate("/");
    } catch (e) {
      console.log("update uh oh " + e);
    }
  }

  return (
    <form className="d-flex flex-column w-50 m-auto mt-5">
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

      <button
        className="btn btn-primary my-4 w-25"
        onClick={handleUpdateExercise}
      >
        Update
      </button>
    </form>
  );
}
