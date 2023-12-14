import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ShowExercises.css";
import ExerciseBars from "./ExerciseBars";
import LoginPrompt from "./LoginPrompt";
import TimePeriodButtons from "./TimePeriodButtons";
import NoExerciseText from "./NoExerciseText";
import ColumnLabels from "./ColumnLabels";

export default function ShowExercises({
  user,
  exercises,
  setExercises,
  thisWeekExercises,
}) {
  const [sortBy, setSortBy] = useState("date");
  const [thisWeek, setThisWeek] = useState(true);
  const noExercises = exercises.length === 0;

  useEffect(() => {
    if (user) handleGetExercises();
  }, [sortBy, user]);

  async function handleGetExercises() {
    try {
      const exerciseObject = await axios({
        method: "GET",
        url: `http://localhost:8000/user/exercises/${user._id}`,
        withCredentials: true,
      });

      const allExercises = exerciseObject.data.data;

      sortExercises(allExercises, sortBy);
    } catch (e) {
      console.log(`Error getting exercises: ${e}`);
    }
  }

  function sortExercises(exercises, sorter) {
    function compare(a, b) {
      if (a[sorter] < b[sorter]) return -1;
      if (a[sorter] > b[sorter]) return 1;
      return 0;
    }
    function compareReverse(a, b) {
      if (a[sorter] < b[sorter]) return 1;
      if (a[sorter] > b[sorter]) return -1;
      return 0;
    }
    setExercises(exercises.sort(sorter === "date" ? compareReverse : compare));
  }

  async function handleDeleteExercise(id, type) {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/${type}Exercise/${id}`,
        withCredentials: true,
      });
      console.log("Exercise Deleted");
      handleGetExercises();
    } catch (e) {
      console.log(`Error deleting exercise: ${e}`);
    }
  }

  return (
    <div className="container d-flex flex-column">
      {user ? (
        <>
          <h1 className="text-center my-4">
            {thisWeek ? "This Week's" : "All"} Exercises
          </h1>
          <TimePeriodButtons thisWeek={thisWeek} setThisWeek={setThisWeek} />
          <div id="exercise-bar-container">
            {noExercises ? (
              <NoExerciseText thisWeek={thisWeek} />
            ) : (
              <ColumnLabels setSortBy={setSortBy} sortBy={sortBy} />
            )}
            <ExerciseBars
              exercises={thisWeek ? thisWeekExercises : exercises}
              handleDeleteExercise={handleDeleteExercise}
            />
          </div>
        </>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
}
