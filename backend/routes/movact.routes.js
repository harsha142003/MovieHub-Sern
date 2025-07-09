const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Movie, Actor } = require('../models/movact');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Serve static files from uploads directory
router.use('/uploads', express.static('uploads'));

// Movie Routes
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/movies', upload.single('image'), async (req, res) => {
    try {
        const movieData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : null
        };
        const movie = await Movie.create(movieData);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/movies/:id', upload.single('image'), async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        const updateData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : movie.image
        };
        await movie.update(updateData);
        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        await movie.destroy();
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actor Routes
router.get('/actors', async (req, res) => {
    try {
        const actors = await Actor.findAll();
        res.json(actors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/actors', upload.single('image'), async (req, res) => {
    try {
        const actorData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : null
        };
        const actor = await Actor.create(actorData);
        res.status(201).json(actor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/actors/:id', async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) return res.status(404).json({ message: 'Actor not found' });
        res.json(actor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/actors/:id', upload.single('image'), async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) return res.status(404).json({ message: 'Actor not found' });
        const updateData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : actor.image
        };
        await actor.update(updateData);
        res.json(actor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/actors/:id', async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (!actor) return res.status(404).json({ message: 'Actor not found' });
        await actor.destroy();
        res.json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 