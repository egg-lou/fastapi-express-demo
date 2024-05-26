import express from 'express'
import { DirectorController } from '../controllers/directorController'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const directors =  await DirectorController.getAllDirectors()
        res.status(200).json(directors)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const director = await DirectorController.getDirectorById(id)
        if (!director) {
            throw new Error('Director not found')
        }
        res.status(200).json(director)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error('Name is required')
        }
        const name = req.body.name
        await DirectorController.createDirector(name)
        res.status(201).json({ message: 'Director created' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error('Name is required')
        }
        const id = parseInt(req.params.id)
        const name = req.body.name
        await DirectorController.updateDirector(id, name)
        res.status(200).json({ message: 'Director updated' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await DirectorController.deleteDirector(id)
        res.status(200).json({ message: 'Director deleted' })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
})

export default router
