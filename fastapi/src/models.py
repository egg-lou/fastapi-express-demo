from pydantic import BaseModel

class DirectorIn(BaseModel):
    name: str

class Director(DirectorIn):
    id: int

class MovieIn(BaseModel):
    title: str
    director: DirectorIn

class Movie(MovieIn):
    id: int