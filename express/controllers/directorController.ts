import { Director } from "../models/Director"
import { openDb } from "../db"

export class DirectorController {
    static async getAllDirectors() {
        const db = await openDb()
        const directors = await db.all("SELECT * FROM directors")
        return directors.map(d => new Director(d.id, d.name))
    }

    static async getDirectorById(id: number) {
        const db = await openDb()
        const director = await db.get("SELECT * FROM directors WHERE id = ?", id)
        return director ? { id: director.id, name: director.name } : null
    }

    static async createDirector(name: string) {
        const db = await openDb()
        await db.run("INSERT INTO directors (name) VALUES (?)", name)
    }

    static async updateDirector(id: number, name: string) {
        const db = await openDb()
        await db.run("UPDATE directors SET name = ? WHERE id = ?", name, id)
    }

    static async deleteDirector(id: number) {
        const db = await openDb()
        await db.run("DELETE FROM directors WHERE id = ?", id)
    }
} 