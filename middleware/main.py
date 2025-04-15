from fastapi import FastAPI
from typing import List
from models import schemas
from api_clients import api_sqlite, api_mysql
from scheduler import start_scheduler

app = FastAPI(title="Middleware de Sincronización entre APIs")

# Iniciar scheduler
start_scheduler()

# === ESTUDIANTES ===
@app.get("/estudiantes", response_model=List[schemas.Estudiante])
def get_estudiantes():
    data = api_sqlite.get_estudiantes()
    if data is None:
        data = api_mysql.get_estudiantes()
    return data or []

@app.post("/estudiantes")
def create_estudiante(est: schemas.Estudiante):
    api_sqlite.create_estudiante(est.dict())
    api_mysql.create_estudiante(est.dict())
    return {"status": "Estudiante creado en ambas APIs"}

# === ASIGNATURAS ===
@app.get("/asignaturas", response_model=List[schemas.Asignatura])
def get_asignaturas():
    data = api_sqlite.get_asignaturas()
    if data is None:
        data = api_mysql.get_asignaturas()
    return data or []

@app.post("/asignaturas")
def create_asignatura(asig: schemas.Asignatura):
    api_sqlite.create_asignatura(asig.dict())
    api_mysql.create_asignatura(asig.dict())
    return {"status": "Asignatura creada en ambas APIs"}

# === PROFESORES ===
@app.get("/profesores", response_model=List[schemas.Profesor])
def get_profesores():
    data = api_sqlite.get_profesores()
    if data is None:
        data = api_mysql.get_profesores()
    return data or []

@app.post("/profesores")
def create_profesor(prof: schemas.Profesor):
    api_sqlite.create_profesor(prof.dict())
    api_mysql.create_profesor(prof.dict())
    return {"status": "Profesor creado en ambas APIs"}

# === MATRICULAS ===
@app.get("/matriculas", response_model=List[schemas.Matricula])
def get_matriculas():
    data = api_sqlite.get_matriculas()
    if data is None:
        data = api_mysql.get_matriculas()
    return data or []

@app.post("/matriculas")
def create_matricula(m: schemas.Matricula):
    api_sqlite.create_matricula(m.dict())
    api_mysql.create_matricula(m.dict())
    return {"status": "Matrícula creada en ambas APIs"}

# === PROFECICLO ===
@app.get("/profeciclos", response_model=List[schemas.Profeciclo])
def get_profeciclos():
    data = api_sqlite.get_profeciclos()
    if data is None:
        data = api_mysql.get_profeciclos()
    return data or []

@app.post("/profeciclos")
def create_profeciclo(p: schemas.Profeciclo):
    api_sqlite.create_profeciclo(p.dict())
    api_mysql.create_profeciclo(p.dict())
    return {"status": "Profeciclo creado en ambas APIs"}
