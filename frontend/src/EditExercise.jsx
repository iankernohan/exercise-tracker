import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import EditStrength from "./EditStrength";
import EditCardio from "./EditCardio";

export default function EditExercise() {
  const [exerciseType, setExerciseType] = useState("");
  const { type, id } = useParams();

  useEffect(() => {
    async function getExercise() {
      try {
        const exercise = await axios.get(
          `http://localhost:5000/${type}Exercise/${id}`
        );
        setExerciseType(exercise.data.type);
      } catch (e) {
        console.log(`Could not get exercise: ${e}`);
      }
    }
    getExercise();
  }, [id, type]);

  return (
    <div className="">
      <Link to="/">
        <button className="btn btn-primary position-absolute ms-4">Back</button>
      </Link>
      {exerciseType === "cardio" && <EditCardio />}
      {exerciseType === "strength" && <EditStrength />}
    </div>
  );
}
