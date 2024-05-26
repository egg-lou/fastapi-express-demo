import { Movie } from "../models/Movie"
import { openDb } from "../db"

export class MovieController{
    static async getAllMovies() {
        const db = await openDb()
        const movies = await db.all(`
            SELECT movies.id, movies.title, directors.id as directorId, directors.name as directorName
            FROM movies
            JOIN directors ON movies.directorId = directors.id
        `)
        return movies.map(m => ({
            id: m.id,
            title: m.title,
            director: {
                id: m.directorId,
                name: m.directorName
            }
        }))
    }

    static async getMovieById(id: number) {
        const db = await openDb()
        const movie = await db.get(`
            SELECT movies.id, movies.title, directors.id as directorId, directors.name as directorName
            FROM movies
            JOIN directors ON movies.directorId = directors.id
            WHERE movies.id = ?
        `, id)
        return movie ? {
            id: movie.id,
            title: movie.title,
            director: {
                id: movie.directorId,
                name: movie.directorName
            }
        } : null
    }

    static async createMovie(title: string, directorId: number) {
        const db = await openDb()
        await db.run("INSERT INTO movies (title, directorId) VALUES (?, ?)", title, directorId)
    }

    static async updateMovie(id: number, title: string, directorId: number) {
        const db = await openDb()
        await db.run("UPDATE movies SET title = ?, directorId = ? WHERE id = ?", title, directorId, id)
    }

    static async deleteMovie(id: number) {
        const db = await openDb()
        await db.run("DELETE FROM movies WHERE id = ?", id)
    }
}