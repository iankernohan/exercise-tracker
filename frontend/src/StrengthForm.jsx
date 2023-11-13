import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StrengthForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  async function handleAddExercise(e) {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8000/strengthExercise/", {
        name,
        weight,
        reps,
        sets,
        date,
      });
      console.log("Exercise Added");
      navigate("/");
    } catch (e) {
      console.log("post uh oh");
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
        <label className="form-label" htmlFor="weight">
          Weight (lbs)
        </label>
        <input
          className="form-control w-75"
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div className="my-2">
        <label className="form-label" htmlFor="reps">
          Reps
        </label>
        <input
          className="form-control w-75"
          id="reps"
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
      </div>
      <div className="my-2">
        <label className="form-label" htmlFor="sets">
          Sets
        </label>
        <input
          className="form-control w-75"
          id="sets"
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
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

      <button className="btn btn-primary my-4 w-25" onClick={handleAddExercise}>
        Add
      </button>
    </form>
  );
}
