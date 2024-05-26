import express from 'express'
import { DirectorController } from '../controllers/directorController'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        const directors =  DirectorController.getAllDirectors()
        res.status(200).json(directors)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const director = DirectorController.getDirectorById(id)
        res.status(200).json(director)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.post('/', (req, res) => {
    try {
        const name = req.body.name
        DirectorController.createDirector(name)
        res.status(201).json({ message: 'Director created' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const name = req.body.name
        DirectorController.updateDirector(id, name)
        res.status(200).json({ message: 'Director updated' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        DirectorController.deleteDirector(id)
        res.status(200).json({ message: 'Director deleted' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})
