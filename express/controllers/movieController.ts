import { Movie } from "../models/Movie"
import { openDb } from "../db"

export class MovieController{
    static async getAllMovies() {
        const db = await openDb()
        const movies = await db.all("SELECT * FROM movies")
        return movies.map(m => new Movie(m.id, m.title, m.directorId))
    }

    static async getMovieById(id: number) {
        const db = await openDb()
        const movie = await db.get("SELECT * FROM movies WHERE id = ?", id)
        return new Movie(movie.id, movie.title, movie.directorId)
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