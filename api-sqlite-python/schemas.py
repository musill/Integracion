from pydantic import BaseModel

# -------- Estudiantes --------
class EstudianteBase(BaseModel):
    id: str
    nombre: str

class EstudianteCreate(EstudianteBase):
    pass

class Estudiante(EstudianteBase):
    flag_sync: bool = False

    class Config:
        orm_mode = True

# -------- Asignaturas --------
class AsignaturaBase(BaseModel):
    idasignatura: int
    nombre: str

class AsignaturaCreate(AsignaturaBase):
    pass

class Asignatura(AsignaturaBase):
    flag_sync: bool = False

    class Config:
        orm_mode = True

# -------- Profesores --------
class ProfesorBase(BaseModel):
    idprofesor: int
    nombre: str

class ProfesorCreate(ProfesorBase):
    pass

class Profesor(ProfesorBase):
    flag_sync: bool = False

    class Config:
        orm_mode = True

# -------- Matrícula --------
class MatriculaBase(BaseModel):
    id_estudiante: str
    id_asignatura: int
    id_ciclo: int
    notauno: float
    notados: float
    supletorio: float

class MatriculaCreate(MatriculaBase):
    pass

class Matricula(MatriculaBase):
    id: int
    flag_sync: bool = False

    class Config:
        orm_mode = True

# -------- Profeciclo --------
class ProfecicloBase(BaseModel):
    ciclo: str
    id_profesor: int
    id_asignatura: int

class ProfecicloCreate(ProfecicloBase):
    pass

class Profeciclo(ProfecicloBase):
    id: int
    flag_sync: bool = False

    class Config:
        orm_mode = True