from pydantic import BaseModel
from typing import Optional

# Estudiantes
class EstudianteBase(BaseModel):
    id: str
    nombre: str

class EstudianteCreate(EstudianteBase): pass

class Estudiante(EstudianteBase):
    flag_sync: Optional[bool]
    class Config:
        orm_mode = True

# Asignatura
class AsignaturaBase(BaseModel):
    idasignatura: int
    nombre: str

class AsignaturaCreate(AsignaturaBase): pass

class Asignatura(AsignaturaBase):
    flag_sync: Optional[bool]
    class Config:
        orm_mode = True

# Profesor
class ProfesorBase(BaseModel):
    
    nombre: str

class ProfesorCreate(ProfesorBase): pass

class Profesor(ProfesorBase):
    idprofesor: int
    flag_sync: Optional[bool]
    class Config:
        orm_mode = True

# Matricula
class MatriculaBase(BaseModel):
    id_estudiante: str
    id_asignatura: int
    id_ciclo: int
    notauno: float
    notados: float
    supletorio: float

class MatriculaCreate(MatriculaBase): pass

class Matricula(MatriculaBase):
    id: int
    flag_sync: Optional[bool]
    class Config:
        orm_mode = True

# Profeciclo
class ProfecicloBase(BaseModel):
    ciclo: str
    id_profesor: int
    id_asignatura: int

class ProfecicloCreate(ProfecicloBase): pass

class Profeciclo(ProfecicloBase):
    id: int
    flag_sync: Optional[bool]
    class Config:
        orm_mode = True
