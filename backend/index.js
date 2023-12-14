import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardioExerciseRoute from "./routes/cardioExerciseRoutes.js";
import strengthExerciseRoutes from "./routes/strengthExerciseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/userModel.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/exercise-tracker")
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log("Error in connecting to MongoDB:", e));

const PORT = 8000;
const app = express();

const store = MongoStore.create({
  mongoUrl: "mongodb://127.0.0.1:27017/exercise-tracker",
  secret: "exercise",
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log(`Session store error: ${err}`);
});

const sessionOptions = {
  secret: "execise",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store,
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/cardioExercise", cardioExerciseRoute);
app.use("/strengthExercise", strengthExerciseRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  req.session.count = req.query.count;
  res.status(200).send(`Hello, world! ${req.session.count}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
