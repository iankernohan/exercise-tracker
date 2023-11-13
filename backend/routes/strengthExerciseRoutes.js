import express from 'express';
import Strength from '../models/strengthExerciseModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const strengthExercises = await Strength.find({});
        return res.status(200).json({
            count: strengthExercises.length,
            data: strengthExercises
        });
    } catch (e) {
        return res.status(500).json('Could not get strength exercises: ' + e);
    }
})

router.post('/', async (req, res) => {
    try {
        const strengthExercise = new Strength(req.body);
        await strengthExercise.save();
        return res.status(200).json('Saved!');
    } catch (e) {
        return res.status(500).json('Could not add strength exercise: ' + e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Strength.findById(id);
        return res.status(200).json(exercise);
    } catch (e) {
        return res.status(500).json(`Could not find exercise: ${e}`);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Strength.findByIdAndUpdate(id, req.body);
        return res.status(200).json('Updated!');
    } catch (e) {
        return res.status(500).json(`Could not update exercise: ${e}`);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Strength.findByIdAndDelete(id);
        return res.status(200).json('Deleted!');
    } catch (e) {
        return res.status(500).json(`Could not delete exercise: ${e}`);
    }
})

export default router;