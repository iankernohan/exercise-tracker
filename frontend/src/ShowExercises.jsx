import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowExercises() {
  const [exercises, setExercises] = useState([]);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    handleGetExercises();
  }, [sortBy]);

  async function handleGetExercises() {
    try {
      const cardio = await axios.get("http://localhost:8000/cardioExercise/");
      const strength = await axios.get(
        "http://localhost:8000/strengthExercise/"
      );
      const allExercises = [...cardio.data.data, ...strength.data.data];
      if (sortBy === "name") setExercises(allExercises.sort(compareName));
      if (sortBy === "type") setExercises(allExercises.sort(compareType));
      if (sortBy === "date") setExercises(allExercises.sort(compareDate));
    } catch (e) {
      console.log("uh oh");
    }
  }

  async function handleDeleteExercise(id, type) {
    try {
      await axios.delete(`http://localhost:8000/${type}Exercise/${id}`);
      console.log("Exercise Deleted");
      handleGetExercises();
    } catch (e) {
      console.log("delete uh oh");
    }
  }

  function compareType(a, b) {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  }

  function compareName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  function compareDate(a, b) {
    if (a.date < b.date) return 1;
    if (a.type > b.date) return -1;
    return 0;
  }

  return (
    <div className="container text-center">
      <div className="row my-4">
        <div className="col-3" onClick={() => setSortBy("name")}>
          Exercise Name
        </div>
        <div className="col-3" onClick={() => setSortBy("type")}>
          Exercise Type
        </div>
        <div className="col-3" onClick={() => setSortBy("date")}>
          Exercise Date
        </div>
        <div className="col-3">Options</div>
      </div>
      {exercises.map((ex) => {
        return (
          <div
            key={ex._id}
            className="row my-2 border border-primary rounded p-2 "
          >
            <div className="col-3 d-flex align-items-center ps-3">
              {ex.name.toUpperCase()}
            </div>
            <div className="col-3 d-flex align-items-center ps-5">
              {ex.type.toUpperCase()}
            </div>
            <div className="col-3 d-flex align-items-center ps-5">
              {ex.date.substring(0, 10)}
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end">
              <Link to={`/exerciseInfo/${ex.type}/${ex._id}`}>
                <button className="btn btn-info">Info</button>
              </Link>
              <Link to={`/editExercise/${ex.type}/${ex._id}`}>
                <button className="btn btn-secondary mx-1">Edit</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteExercise(ex._id, ex.type)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
