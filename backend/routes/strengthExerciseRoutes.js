import express from "express";
import Strength from "../models/strengthExerciseModel.js";
import User from "../models/userModel.js";

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.user) next();
}

router.get("/", async (req, res) => {
  try {
    const strengthExercises = await Strength.find({});
    return res.status(200).json({
      count: strengthExercises.length,
      data: strengthExercises,
    });
  } catch (e) {
    return res.status(500).json("Could not get strength exercises: " + e);
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { user } = req.body;
    const userModel = await User.findById(user._id);
    const strengthExercise = new Strength(req.body);
    await strengthExercise.save();
    userModel.strengthExercises.push(strengthExercise);
    await userModel.save();
    return res.status(200).json("Saved!");
  } catch (e) {
    return res.status(500).json("Could not add strength exercise: " + e);
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Strength.findById(id);
    return res.status(200).json(exercise);
  } catch (e) {
    return res.status(500).json(`Could not find exercise: ${e}`);
  }
});

router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, weight, reps, sets, date } = req.body;
    await Strength.findByIdAndUpdate(id, { name, weight, reps, sets, date });
    return res.status(200).json("Updated!");
  } catch (e) {
    return res.status(500).json(`Could not update exercise: ${e}`);
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    await Strength.findByIdAndDelete(id);
    return res.status(200).json("Deleted!");
  } catch (e) {
    return res.status(500).json(`Could not delete exercise: ${e}`);
  }
});

export default router;
