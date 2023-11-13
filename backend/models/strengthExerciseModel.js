import mongoose from "mongoose";

const strengthExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        default: 'strength'
    }
},
    {
        timestamps: true
    }
)

const Strength = mongoose.model('Strength', strengthExerciseSchema);

export default Strength;