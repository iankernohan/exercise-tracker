import { Link } from "react-router-dom";
import { BsFillTrash3Fill, BsInfoLg, BsFillPencilFill } from "react-icons/bs";

export default function ExerciseBars({ exercises, handleDeleteExercise }) {
  return (
    <>
      {exercises.map((ex) => {
        return (
          <div className="row my-3 p-2" id="exercise-bar" key={ex._id}>
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
        );
      })}
    </>
  );
}
