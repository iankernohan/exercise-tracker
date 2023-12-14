import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStrength({ exercise }) {
  const [name, setName] = useState(exercise.name);
  const [weight, setWeight] = useState(exercise.weight);
  const [reps, setReps] = useState(exercise.reps);
  const [sets, setSets] = useState(exercise.sets);
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
          weight,
          reps,
          sets,
          date,
        },
        url: `http://localhost:8000/strengthExercise/${id}`,
        withCredentials: true,
      });
      console.log("Exercise Updated!");
      navigate("/");
    } catch (e) {
      console.log(`Updating strength error: ${e}`);
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

      <button className="button py-4 my-4 w-25" onClick={handleUpdateExercise}>
        Update
      </button>
    </form>
  );
}
