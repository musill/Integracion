from pydantic import BaseModel
from typing import Optional

class Estudiante(BaseModel):
    id: str
    nombre: str
    flag_sync: Optional[bool] = False

class Asignatura(BaseModel):
    idasignatura: int
    nombre: str
    flag_sync: Optional[bool] = False

class Profesor(BaseModel):
    idprofesor: int
    nombre: str
    flag_sync: Optional[bool] = False

class Matricula(BaseModel):
    id: int
    id_estudiante: str
    id_asignatura: int
    id_ciclo: int
    notauno: float
    notados: float
    supletorio: float
    flag_sync: Optional[bool] = False

class Profeciclo(BaseModel):
    id: int
    ciclo: str
    id_profesor: int
    id_asignatura: int
    flag_sync: Optional[bool] = False
