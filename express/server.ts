import express from 'express'
import cors from 'cors'
import directorRoutes from '../express/routes/directorRoute'
import movieRoutes from '../express/routes/movieRoute'
import { openDb } from './db'

const app = express()
const port = 5000


app.use(cors(
    {
        origin: '*'
    }
))

openDb()

app.use(express.json())
app.get('/', (req,res) => {
    res.json({message: 'Server running...'}).status(200)
})

app.use('/director/', directorRoutes)
app.use('/movie/', movieRoutes)

app.listen(port, () => {
    try {
        console.log(`Server listening on port ${port}`)
    }
    catch (err) {
        console.log(err)
    }
})