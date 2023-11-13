import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import CardioInfo from "./CardioInfo";
import StrengthInfo from "./StrengthInfo";

export default function ExerciseInfo() {
  const [exerciseType, setExerciseType] = useState("");
  const [exercise, setExercise] = useState("");
  const { type, id } = useParams();

  useEffect(() => {
    async function getExercise() {
      try {
        const exercise = await axios.get(
          `http://localhost:8000/${type}Exercise/${id}`
        );
        setExerciseType(exercise.data.type);
        setExercise(exercise.data);
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
      {exerciseType === "cardio" && <CardioInfo exercise={exercise} />}
      {exerciseType === "strength" && <StrengthInfo exercise={exercise} />}
    </div>
  );
}
