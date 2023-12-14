import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import EditStrength from "./EditStrength";
import EditCardio from "./EditCardio";
import BackButton from "./BackButton";
import LoginPrompt from "./LoginPrompt";

export default function EditExercise({ user }) {
  const { type, id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [exerciseType, setExerciseType] = useState("");

  useEffect(() => {
    async function getExercise() {
      try {
        const exercise = await axios({
          method: "GET",
          url: `http://localhost:8000/${type}Exercise/${id}`,
          withCredentials: true,
        });
        setExercise(exercise.data);
        setExerciseType(exercise.data.type);
      } catch (e) {
        console.log(`Could not get exercise: ${e}`);
      }
    }
    getExercise();
  }, [id, type]);

  return user ? (
    <div>
      <BackButton />
      {exerciseType === "cardio" && <EditCardio exercise={exercise} />}
      {exerciseType === "strength" && <EditStrength exercise={exercise} />}
    </div>
  ) : (
    <LoginPrompt />
  );
}
