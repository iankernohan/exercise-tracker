import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    cardioExercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cardio",
      },
    ],
    strengthExercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Strength",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
