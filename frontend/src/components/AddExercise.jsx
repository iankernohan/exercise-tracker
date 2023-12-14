import CardioForm from "./CardioForm";
import StrengthForm from "./StrengthForm";
import { useState } from "react";

import ExerciseType from "./ExerciseType";
import BackButton from "./BackButton";
import LoginPrompt from "./LoginPrompt";

export default function AddExercise({ user, setUser }) {
  const [exerciseType, setExerciseType] = useState("cardio");

  return user ? (
    <div className="d-flex flex-column mt-5">
      <BackButton />
      <ExerciseType
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
      />
      {exerciseType === "cardio" && (
        <CardioForm user={user} setUser={setUser} />
      )}
      {exerciseType === "strength" && (
        <StrengthForm user={user} setUser={setUser} />
      )}
    </div>
  ) : (
    <LoginPrompt />
  );
}
