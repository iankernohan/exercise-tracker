import LoginPrompt from "./LoginPrompt";
import "../styles/UserInfo.css";
import BackButton from "./BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserInfo({
  user,
  setUser,
  exercises,
  thisWeekExercises,
}) {
  function cardioMins(arr) {
    const cardioArr = arr.filter((ex) => (ex.type === "cardio" ? ex : null));
    let totalMins = 0;
    for (let cardio of cardioArr) {
      totalMins += cardio.duration;
    }
    return totalMins;
  }

  const totalCardioMins = cardioMins(exercises);
  const thisWeekCardioMins = cardioMins(thisWeekExercises);
  const cardioExercises = exercises.filter((ex) => ex.type === "cardio");
  const strengthExercises = exercises.filter((ex) => ex.type === "strength");
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    const ok = window.confirm("Are you sure you want to delete yout profile?");
    if (ok) {
      try {
        await axios({
          method: "DELETE",
          url: `http://localhost:8000/user/${user._id}`,
          withCredentials: true,
        });
        await axios.post("http://localhost:8000/user/logout");
        setUser(null);
        navigate("/");
        console.log("User deleted!");
      } catch (e) {
        console.log(`Could not delete user: ${e}`);
      }
    }
  }

  return user ? (
    <>
      <BackButton className="mt-4" />
      <div className="grid container w-50 text-center bgborder" id="user-info">
        <h1>User Info</h1>
        <section className="row">
          <div className="col-6">Username</div>
          <div className="col-6">{user.username}</div>
        </section>

        <h4 className="mt-2">This Week</h4>

        <section className="row">
          <div className="col-6">Exercises This Week:</div>
          <div className="col-6">{thisWeekExercises.length}</div>
        </section>

        <section className="row">
          <div className="col-6">Cardio This Week</div>
          <div className="col-6">
            {thisWeekExercises.filter((ex) => ex.type === "cardio").length}
          </div>
        </section>

        <section className="row">
          <div className="col-6">Strength This Week</div>
          <div className="col-6">
            {thisWeekExercises.filter((ex) => ex.type === "strength").length}
          </div>
        </section>

        <section className="row">
          <div className="col-6">Cardio Mins. This Week:</div>
          <div className="col-6">{thisWeekCardioMins}</div>
        </section>

        <h4 className="mt-4 mb-0">Overall</h4>
        <section className="row">
          <div className="col-6">Total Exercises</div>
          <div className="col-6">
            {cardioExercises.length + strengthExercises.length}
          </div>
        </section>

        <section className="row">
          <div className="col-6">Total Cardio Exercises</div>
          <div className="col-6">{cardioExercises.length}</div>
        </section>

        <section className="row">
          <div className="col-6">Total Strength Exercises</div>
          <div className="col-6">{strengthExercises.length}</div>
        </section>

        <section className="row">
          <div className="col-6">Total Cardio Mins.</div>
          <div className="col-6">{totalCardioMins}</div>
        </section>
      </div>
      <button className="button mx-auto my-5" onClick={handleDeleteAccount}>
        Delete Profile
      </button>
    </>
  ) : (
    <LoginPrompt />
  );
}
