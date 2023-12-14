import { Link } from "react-router-dom";

export default function NoExerciseText({ thisWeek }) {
  return (
    <div
      className="align-self-center my-5 text-center bgborder"
      id="no-exercise-text"
    >
      {!thisWeek && <h3>Go ahead and start tracking some exercises!</h3>}
      {thisWeek && <h3>No exercises this week</h3>}
      <Link to={"/addExercise"} style={{ textDecoration: "none" }}>
        <button className="button py-4 mt-3 mx-auto">Add Exercise</button>
      </Link>
    </div>
  );
}
