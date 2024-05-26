from pydantic import BaseModel

class DirectorIn(BaseModel):
    name: str

class Director(DirectorIn):
    id: int

class MovieIn(BaseModel):
    title: str
    directorId: int

class Movie(MovieIn):
    id: int
    director: Director
    directorId: int