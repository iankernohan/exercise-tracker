import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowExercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    handleGetExercises();
  }, []);

  async function handleGetExercises() {
    try {
      const cardio = await axios.get("http://localhost:5000/cardioExercise/");
      const strength = await axios.get(
        "http://localhost:5000/strengthExercise/"
      );
      const allExercises = [...cardio.data.data, ...strength.data.data];
      setExercises(allExercises);
    } catch (e) {
      console.log("uh oh");
    }
  }

  async function handleDeleteExercise(id) {
    try {
      await axios.delete(`http://localhost:5000/cardioExercise/${id}`);
      console.log("Exercise Deleted");
      handleGetExercises();
    } catch (e) {
      console.log("delete uh oh");
    }
  }

  return (
    <div className="container text-center">
      <div className="row my-4">
        <div className="col-3">Exercise Name</div>
        <div className="col-3">Exercise Type</div>
        <div className="col-3">Exercise Date</div>
        <div className="col-3">Options</div>
      </div>
      {exercises.map((ex) => {
        return (
          <div
            key={ex._id}
            className="row my-2 border border-primary rounded p-2 "
          >
            <div className="col-3 d-flex align-items-center">
              {ex.name.toUpperCase()}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center">
              {ex.type.toUpperCase()}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center">
              {ex.date.substring(0, 10)}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteExercise(ex._id)}
              >
                Delete
              </button>
              <Link to={`/editExercise/${ex.type}/${ex._id}`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
