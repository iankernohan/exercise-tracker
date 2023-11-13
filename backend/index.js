import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardioExerciseRoute from "./routes/cardioExerciseRoutes.js";
import strengthExerciseRoutes from "./routes/strengthExerciseRoutes.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/exercise-tracker")
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log("Error in connecting to MongoDB:", e));

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/cardioExercise", cardioExerciseRoute);
app.use("/strengthExercise", strengthExerciseRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
