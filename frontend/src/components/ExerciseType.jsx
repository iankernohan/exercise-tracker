import "../styles/TypeButtons.css";

export default function ExerciseType({ exerciseType, setExerciseType }) {
  return (
    <div className="align-self-center type-buttons">
      <button
        className={exerciseType === "cardio" ? "active-button" : "non-active"}
        onClick={() => setExerciseType("cardio")}
      >
        Cardio
      </button>
      <button
        className={exerciseType === "strength" ? "active-button" : "non-active"}
        onClick={() => setExerciseType("strength")}
      >
        Strength
      </button>
    </div>
  );
}
