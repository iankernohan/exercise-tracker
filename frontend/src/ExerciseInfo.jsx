import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ExerciseInfo.css";

import CardioInfo from "./CardioInfo";
import StrengthInfo from "./StrengthInfo";
import BackButton from "./BackButton";

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
      <BackButton className="position-absolute mt-4" />
      <div className="d-flex flex-col justify-content-center">
        <div className="container w-50" id="exercise-info-container">
          {exerciseType === "cardio" && <CardioInfo exercise={exercise} />}
          {exerciseType === "strength" && <StrengthInfo exercise={exercise} />}
        </div>
      </div>
    </div>
  );
}
