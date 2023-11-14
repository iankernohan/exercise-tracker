import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillTrash3Fill, BsInfoLg, BsFillPencilFill } from "react-icons/bs";
import "./ShowExercises.css";

export default function ShowExercises() {
  const [exercises, setExercises] = useState([]);
  const [sortBy, setSortBy] = useState("date");

  const sortByStlyes = { textDecoration: "underline", fontWeight: "600" };

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
      console.log(`Error getting exercises: ${e}`);
    }
  }

  async function handleDeleteExercise(id, type) {
    try {
      await axios.delete(`http://localhost:8000/${type}Exercise/${id}`);
      console.log("Exercise Deleted");
      handleGetExercises();
    } catch (e) {
      console.log(`Error deleting exercise: ${e}`);
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
    <div className="container">
      <div className="row my-4" id="exercise-column-labels">
        <div
          className="col-3 ps-3 exercise-column-label"
          onClick={() => setSortBy("name")}
          style={sortBy === "name" ? sortByStlyes : {}}
        >
          Exercise Name
        </div>
        <div
          className="col-3 ps-5 exercise-column-label"
          onClick={() => setSortBy("type")}
          style={sortBy === "type" ? sortByStlyes : {}}
        >
          Exercise Type
        </div>
        <div
          className="col-3 ps-5 exercise-column-label"
          onClick={() => setSortBy("date")}
          style={sortBy === "date" ? sortByStlyes : {}}
        >
          Exercise Date
        </div>
        <div className="col-3 text-center pe-4">Options</div>
      </div>
      {exercises.map((ex) => {
        return (
          <Link
            to={`/exerciseInfo/${ex.type}/${ex._id}`}
            style={{ textDecoration: "none" }}
          >
            <div key={ex._id} className="row my-2 p-2" id="exercise-bar">
              <div className="col-3 d-flex align-items-center ps-3">
                {ex.name.toUpperCase()}
              </div>
              <div className="col-3 d-flex align-items-center ps-5">
                {ex.type.toUpperCase()}
              </div>
              <div className="col-3 d-flex align-items-center ps-5">
                {ex.date.substring(0, 10)}
              </div>
              <div
                className="col-3 d-flex align-items-center justify-content-center"
                id="exercise-options-label"
              >
                <Link to={`/exerciseInfo/${ex.type}/${ex._id}`}>
                  <button className="btn" id="info-button">
                    <BsInfoLg />
                  </button>
                </Link>
                <Link to={`/editExercise/${ex.type}/${ex._id}`}>
                  <button className="btn mx-1" id="edit-button">
                    {" "}
                    <BsFillPencilFill />
                  </button>
                </Link>
                <button
                  className="btn"
                  id="delete-button"
                  onClick={() => handleDeleteExercise(ex._id, ex.type)}
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
