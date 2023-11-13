import { Link } from "react-router-dom";
import CardioForm from "./CardioForm";
import StrengthForm from "./StrengthForm";
import { useState } from "react";

import ExerciseType from "./ExerciseType";

export default function AddExercise() {
  const [exerciseType, setExerciseType] = useState("strength");

  return (
    <div className="d-flex flex-column">
      <Link to="/">
        <button className="btn btn-primary  ms-4">Back</button>
      </Link>
      <ExerciseType
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
      />
      {exerciseType === "cardio" && <CardioForm />}
      {exerciseType === "strength" && <StrengthForm />}
    </div>
  );
}
