# models/schemas.py

from pydantic import BaseModel

class EstudianteBase(BaseModel):
    id: int
    nombre: str
    apellido: str
    edad: int
    flag_sync: bool

class EstudianteCreate(BaseModel):
    nombre: str
    apellido: str
    edad: int

class EstudianteUpdate(EstudianteCreate):
    pass
