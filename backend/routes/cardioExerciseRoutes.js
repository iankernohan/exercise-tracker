import express from "express";
import Cardio from "../models/cardioExerciseModel.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cardioExercises = await Cardio.find({});
        return res.status(200).json({
            count: cardioExercises.length,
            data: cardioExercises
        });
    } catch (e) {
        return res.status(500).json('Could not get cardio exercises: ' + e);
    }
})

router.post('/', async (req, res) => {
    try {
        const cardioExercise = new Cardio(req.body);
        await cardioExercise.save();
        return res.status(200).json('Saved!');
    } catch (e) {
        return res.status(500).json('Could not add cardio exercise: ' + e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Cardio.findById(id);
        return res.status(200).json(exercise);
    } catch (e) {
        return res.status(500).json('Could not get cardio exercise: ' + e);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration, date } = req.body;
        await Cardio.findByIdAndUpdate(id, { name, duration, date });
        return res.status(200).json('Updated!');
    } catch (e) {
        return res.status(500).json('Could not update cardio exercise: ' + e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Cardio.findByIdAndDelete(id);
        return res.status(200).json('Deleted!');
    } catch (e) {
        return res.status(500).json('Could not delete cardio exercise: ' + e)
    }
})

export default router;