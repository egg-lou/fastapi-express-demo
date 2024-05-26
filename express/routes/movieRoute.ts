import express from 'express'
import { MovieController } from '../controllers/movieController'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const movies = await MovieController.getAllMovies()
        res.status(200).send(movies)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const movie = await MovieController.getMovieById(id)
        if (!movie) {
            throw new Error('Movie not found')
        }
        res.status(200).send(movie)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.directorId) {
            throw new Error('Title is required and directorId is required')
        }
        const title = req.body.title
        const directorId = req.body.directorId
        await MovieController.createMovie(title, directorId)
        res.status(201).json({ message: 'Movie created' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title) {
            throw new Error('Title is required')
        }
        const id = parseInt(req.params.id)
        const title = req.body.title
        const directorId = req.body.directorId
        await MovieController.updateMovie(id, title, directorId)
        res.status(200).json({ message: 'Movie updated' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await MovieController.deleteMovie(id)
        res.status(200).json({ message: 'Movie deleted' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

export default router 