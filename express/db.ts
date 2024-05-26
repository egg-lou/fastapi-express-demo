import  sqlite3 from "sqlite3"
import { open } from "sqlite"

// For MySQL
import mysql from "mysql2/promise"

export async function openDb() {
    const db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database
    });

    await db.run('CREATE TABLE IF NOT EXISTS directors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    await db.run('CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, directorId INTEGER, FOREIGN KEY(directorId) REFERENCES directors(id))');

  return db
}

// For MySQL
// export async function openDb() {
//     const db = await mysql.createConnection({
//       host: "localhost",
//       user: "XXXX",
//       password: "XXXX",
//       database: "XXXXXX"
//     });
//     await db.execute('CREATE TABLE IF NOT EXISTS directors(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))');
//     await db.execute('CREATE TABLE IF NOT EXISTS movies(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), directorId INT, FOREIGN KEY(directorId) REFERENCES directors(id))');

//     return db;
// }
