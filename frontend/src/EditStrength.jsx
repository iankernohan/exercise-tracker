import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStrength() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getExercise() {
      const exercise = await axios.get(
        `http://localhost:5000/strengthExercise/${id}`
      );
      setName(exercise.data.name);
      setWeight(exercise.data.weight);
      setReps(exercise.data.reps);
      setSets(exercise.data.sets);
      setDate(new Date(exercise.data.date));
    }
    getExercise();
  }, [id]);

  async function handleUpdateExercise(e) {
    try {
      e.preventDefault();
      await axios.post("http://localhost:5000/strengthExercise/", {
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
          onChange={(e) => setName(e.target.value)}
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

      <button
        className="btn btn-primary my-4 w-25"
        onClick={handleUpdateExercise}
      >
        Update
      </button>
    </form>
  );
}
