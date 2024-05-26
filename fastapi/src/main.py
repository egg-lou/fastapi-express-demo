from typing import List
from fastapi import FastAPI, HTTPException
from .models import DirectorIn, Director, MovieIn, Movie
from .database import open_db

app = FastAPI()

@app.get('/movies', response_model=List[Movie])
async def get_all_movies():
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT movies.id, movies.title, directors.id, directors.name
        FROM movies
        JOIN directors ON movies.directorId = directors.id
    """)
    movies = cursor.fetchall()
    return [{"id": m[0], "title": m[1], "director": {"id": m[2], "name": m[3]}, "directorId": m[2]} for m in movies]

@app.get("/movies/{id}", response_model=Movie)
async def get_movie_by_id(id: int):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT movies.id, movies.title, directors.id, directors.name
        FROM movies
        JOIN directors ON movies.directorId = directors.id
        WHERE movies.id = ?
    """, (id,))
    movie = cursor.fetchone()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return {"id": movie[0], "title": movie[1], "director": {"id": movie[2], "name": movie[3]}, "directorId": movie[2]}

@app.post("/movies", response_model=Movie)
async def create_movie(movie: MovieIn):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO movies (title, directorId) VALUES (?, ?)", (movie.title, movie.directorId))
    conn.commit()
    cursor.execute("SELECT * FROM directors WHERE id = ?", (movie.directorId,))
    director = cursor.fetchone()
    return {"id": cursor.lastrowid, "title": movie.title, "director": {"id": director[0], "name": director[1]}, "directorId": director[0]}

@app.put("/movies/{id}", response_model=Movie)
async def update_movie(id: int, movie: MovieIn):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE movies SET title = ?, directorId = ? WHERE id = ?", (movie.title, movie.directorId, id))
    conn.commit()
    cursor.execute("SELECT * FROM directors WHERE id = ?", (movie.directorId,))
    director = cursor.fetchone()
    return {"id": id, "title": movie.title, "director": {"id": director[0], "name": director[1]}, "directorId": director[0]}

@app.get("/directors", response_model=List[Director])
async def get_all_directors():
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM directors")
    directors = cursor.fetchall()
    return [{"id": d[0], "name": d[1]} for d in directors]

@app.get("/directors/{id}", response_model=Director)
async def get_director_by_id(id: int):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM directors WHERE id = ?", (id,))
    director = cursor.fetchone()
    if director is None:
        raise HTTPException(status_code=404, detail="Director not found")
    return {"id": director["id"], "name": director["name"]}

@app.delete("/directors/{id}")
async def delete_director(id: int):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM directors WHERE id = ?", (id,))
    conn.commit()

@app.post("/directors", response_model=Director)
async def create_director(director: DirectorIn):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO directors (name) VALUES (?)", (director.name,))
    conn.commit()
    return {"id": cursor.lastrowid, "name": director.name}

@app.put("/directors/{id}", response_model=Director)
async def update_director(id: int, director: DirectorIn):
    conn = open_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE directors SET name = ? WHERE id = ?", (director.name, id))
    conn.commit()
    return {"id": id, "name": director.name}