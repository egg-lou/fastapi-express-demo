import  sqlite3 from "sqlite3"
import { open } from "sqlite"

export async function openDb() {
    const db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database
    });

    await db.run('CREATE TABLE IF NOT EXISTS directors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    await db.run('CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, directorId INTEGER, FOREIGN KEY(directorId) REFERENCES directors(id))');

  return db
}
