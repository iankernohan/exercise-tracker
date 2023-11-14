import "./ExerciseType.css";

export default function ExerciseType({ exerciseType, setExerciseType }) {
  return (
    <div className="align-self-center" id="exercise-type-buttons">
      <button
        className={`btn rounded-start ${
          exerciseType === "cardio" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => setExerciseType("cardio")}
      >
        Cardio
      </button>
      <button
        className={`btn rounded-end ${
          exerciseType === "strength" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => setExerciseType("strength")}
      >
        Strength
      </button>
    </div>
  );
}
