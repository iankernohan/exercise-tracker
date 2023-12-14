import express from "express";
import Cardio from "../models/cardioExerciseModel.js";
import User from "../models/userModel.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.user) next();
}

router.get("/", async (req, res) => {
  try {
    const cardioExercises = await Cardio.find({});
    return res.status(200).json({
      count: cardioExercises.length,
      data: cardioExercises,
    });
  } catch (e) {
    return res.status(500).json("Could not get cardio exercises: " + e);
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    console.log("adding exercise", req.user);
    const { user } = req.body;
    const userModel = await User.findById(user._id);
    const cardioExercise = new Cardio(req.body);
    await cardioExercise.save();
    userModel.cardioExercises.push(cardioExercise);
    await userModel.save();
    return res.status(200).json("Exercise Added!");
  } catch (e) {
    return res.status(500).json("Could not add cardio exercise: " + e);
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Cardio.findById(id);
    return res.status(200).json(exercise);
  } catch (e) {
    return res.status(500).json("Could not get cardio exercise: " + e);
  }
});

router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, date } = req.body;
    await Cardio.findByIdAndUpdate(id, { name, duration, date });
    return res.status(200).json("Updated!");
  } catch (e) {
    return res.status(500).json("Could not update cardio exercise: " + e);
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cardio.findByIdAndDelete(id);
    const user = await User.findById(req.user._id);
    console.log(user.cardioExercises.includes(id));
    console.log(user.cardioExercises.indexOf(id));
    const newCardioArr = user.cardioExercises;
    newCardioArr.splice(user.cardioExercises.indexOf(id), 1);
    // const newCardioArr = user.cardioExercises.filter((cardio) => {
    //   if (cardio === id) return cardio;
    // });
    // console.log(newCardioArr);
    user.cardioExercises = [...newCardioArr];
    await user.save();
    return res.status(200).json("Deleted!");
  } catch (e) {
    return res.status(500).json("Could not delete cardio exercise: " + e);
  }
});

export default router;
