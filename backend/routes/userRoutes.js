import express from "express";
import passport from "passport";
import User from "../models/userModel.js";
import Cardio from "../models/cardioExerciseModel.js";
import Strength from "../models/strengthExerciseModel.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.user) next();
}

router.get("/", async (req, res) => {
  if (req.user) return res.json(req.user);
});

//RETURNS ARRAY OF EXERCISE OBJECTS FOR GIVEN USER
router.get("/exercises/:userID", isLoggedIn, async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);
  let exercises = [];
  for (let cardio of user.cardioExercises) {
    const exercise = await Cardio.find(cardio);
    exercises = [...exercises, ...exercise];
  }
  for (let strength of user.strengthExercises) {
    const exercise = await Strength.find(strength);
    exercises = [...exercises, ...exercise];
  }
  res.json({ data: exercises });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username });
    const registeredUser = await User.register(newUser, password);
    passport.authenticate(registeredUser, (err) => {
      if (err) throw new Error("Could not log in.");
    });
    return res.status(200).json(registeredUser);
  } catch (e) {
    return res.status(500).json(`Error registering user: ${e}`);
  }
});

router.get("/loginFail", (req, res) => {
  return res.status(500).json("Could not log in.");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/user/loginFail",
  }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) console.log(err);
    });
    return res.status(200).json(req.user);
  }
);

router.post("/logout", (req, res) => {
  try {
    req.logOut((e) => {
      if (e) return res.json(`error: ${e}`);
      return res.status(200).json("Logged out.");
    });
  } catch (e) {
    return res.status(500).json(`Error logging out: ${e}`);
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted.", user });
  } catch (e) {
    res.status(500).json(`Error deleted user: ${e}`);
  }
});

export default router;
