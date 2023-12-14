import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import AddExercise from "./AddExercise";
import ShowExercises from "./ShowExercises";
import EditExercise from "./EditExercise";
import ExerciseInfo from "./ExerciseInfo";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import UserInfo from "./UserInfo";

function App() {
  const [user, setUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const weekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
  const thisWeekExercises = exercises.filter((ex) => {
    if (ex.date > weekAgo.toISOString()) {
      return ex.date;
    }
    return null;
  });

  useEffect(() => {
    async function isUser() {
      const isLoggedIn = await axios.get("http://localhost:8000/user/");
      setUser(isLoggedIn);
    }
    isUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} setExercises={setExercises} />
      <Routes>
        <Route
          path="/"
          element={
            <ShowExercises
              user={user}
              exercises={exercises}
              setExercises={setExercises}
              thisWeekExercises={thisWeekExercises}
            />
          }
        />
        <Route
          path="/addExercise"
          element={<AddExercise user={user} setUser={setUser} />}
        />
        <Route
          path="/editExercise/:type/:id"
          element={<EditExercise user={user} />}
        />
        <Route
          path="/exerciseInfo/:type/:id"
          element={<ExerciseInfo user={user} />}
        />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm setUser={setUser} />} />
        <Route
          path="/userInfo"
          element={
            <UserInfo
              user={user}
              setUser={setUser}
              exercises={exercises}
              thisWeekExercises={thisWeekExercises}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
