import CardioForm from "./CardioForm";
import StrengthForm from "./StrengthForm";
import { useState } from "react";

import ExerciseType from "./ExerciseType";
import BackButton from "./BackButton";

export default function AddExercise() {
  const [exerciseType, setExerciseType] = useState("cardio");

  return (
    <div className="d-flex flex-column mt-5">
      <BackButton />
      <ExerciseType
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
      />
      {exerciseType === "cardio" && <CardioForm />}
      {exerciseType === "strength" && <StrengthForm />}
    </div>
  );
}
