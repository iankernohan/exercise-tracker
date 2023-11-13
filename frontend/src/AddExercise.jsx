import { Link } from "react-router-dom";
import CardioForm from "./CardioForm";
import StrengthForm from "./StrengthForm";
import { useState } from "react";

export default function AddExercise() {
  const [exerciseType, setExerciseType] = useState("strength");

  return (
    <div className="">
      <Link to="/">
        <button className="btn btn-primary position-absolute ms-4">Back</button>
      </Link>
      {exerciseType === "cardio" && <CardioForm />}
      {exerciseType === "strength" && <StrengthForm />}
    </div>
  );
}
