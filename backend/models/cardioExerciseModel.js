import mongoose from "mongoose";

const cardioExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        default: 'cardio'
    }
},
    {
        timestamps: true
    }
)

const Cardio = mongoose.model('cardio', cardioExerciseSchema);

export default Cardio;