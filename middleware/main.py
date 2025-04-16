from fastapi import FastAPI, HTTPException
from typing import List
from models import schemas
from api_clients import api_sqlite, api_mysql
from scheduler import start_scheduler
import logging
from fastapi.middleware.cors import CORSMiddleware

# Iniciar logger para los errores
logger = logging.getLogger("uvicorn")
logger.setLevel(logging.INFO)

app = FastAPI(title="Middleware de Sincronización entre APIs")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],
)
# Iniciar scheduler
start_scheduler()

# Función para obtener datos con fallback (respaldo)
def get_data_with_fallback(api_function):
    try:
        data = api_function()
        if data is None:
            raise ValueError("No se pudo obtener datos desde la API.")
        return data
    except Exception as e:
        logger.error(f"Error al obtener datos: {str(e)}")
        return None

# === ESTUDIANTES ===
@app.get("/estudiantes", response_model=List[schemas.Estudiante])
def get_estudiantes():
    data = get_data_with_fallback(api_mysql.get_estudiantes)
    if not data:
        data = get_data_with_fallback(api_sqlite.get_estudiantes)
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de estudiantes.")
    return data

@app.get("/estudiantes/{id}", response_model=schemas.Estudiante)
def get_estudiante_by_id(id: int):
    data = get_data_with_fallback(lambda: api_mysql.get_estudiante(id))
    if not data:
        data = get_data_with_fallback(lambda: api_sqlite.get_estudiante(id))
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información del estudiante.")
    return data

@app.post("/estudiantes")
def create_estudiante(est: schemas.Estudiante):
    data = est.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.create_estudiante(data)
    except Exception as e:
        logger.error(f"Error creando estudiante en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creando estudiante en SQLite.")
    return {"status": "Estudiante creado en SQLite y pendiente de sincronización"}

@app.put("/estudiantes/{id}")
def update_estudiante(id: int, est: schemas.Estudiante):
    data = est.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.update_estudiante(id, data)
    except Exception as e:
        logger.error(f"Error actualizando estudiante en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error actualizando estudiante en SQLite.")
    return {"status": "Estudiante actualizado en SQLite y pendiente de sincronización"}

@app.delete("/estudiantes/{id}")
def delete_estudiante(id: int):
    try:
        api_sqlite.delete_estudiante(id)
    except Exception as e:
        logger.error(f"Error eliminando estudiante en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error eliminando estudiante en SQLite.")
    return {"status": "Estudiante eliminado de SQLite y pendiente de sincronización"}

# === ASIGNATURAS ===
@app.get("/asignaturas", response_model=List[schemas.Asignatura])
def get_asignaturas():
    data = get_data_with_fallback(api_sqlite.get_asignaturas)
    
    if not data:
        data = get_data_with_fallback(api_mysql.get_asignaturas)
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de asignaturas.")
    return data

@app.get("/asignaturas/{id}", response_model=schemas.Asignatura)
def get_asignatura_by_id(id: int):
    data = get_data_with_fallback(lambda: api_mysql.get_asignatura(id))
    if not data:
        data = get_data_with_fallback(lambda: api_sqlite.get_asignatura(id))
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de la asignatura.")
    return data

@app.post("/asignaturas")
def create_asignatura(asig: schemas.Asignatura):
    data = asig.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.create_asignatura(data)
    except Exception as e:
        logger.error(f"Error creando asignatura en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creando asignatura en SQLite.")
    return {"status": "Asignatura creada en SQLite y pendiente de sincronización"}

@app.put("/asignaturas/{id}")
def update_asignatura(id: int, asig: schemas.Asignatura):
    data = asig.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.update_asignatura(id, data)
    except Exception as e:
        logger.error(f"Error actualizando asignatura en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error actualizando asignatura en SQLite.")
    return {"status": "Asignatura actualizada en SQLite y pendiente de sincronización"}

@app.delete("/asignaturas/{id}")
def delete_asignatura(id: int):
    try:
        api_sqlite.delete_asignatura(id)
    except Exception as e:
        logger.error(f"Error eliminando asignatura en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error eliminando asignatura en SQLite.")
    return {"status": "Asignatura eliminada de SQLite y pendiente de sincronización"}

# === PROFESORES ===
@app.get("/profesores", response_model=List[schemas.Profesor])
def get_profesores():
    data = get_data_with_fallback(api_mysql.get_profesores)
    if not data:
        data = get_data_with_fallback(api_sqlite.get_profesores)
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de profesores.")
    return data

@app.get("/profesores/{id}", response_model=schemas.Profesor)
def get_profesor_by_id(id: int):
    data = get_data_with_fallback(lambda: api_mysql.get_profesor(id))
    if not data:
        data = get_data_with_fallback(lambda: api_sqlite.get_profesor(id))
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información del profesor.")
    return data

@app.post("/profesores")
def create_profesor(prof: schemas.Profesor):
    data = prof.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.create_profesor(data)
    except Exception as e:
        logger.error(f"Error creando profesor en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creando profesor en SQLite.")
    return {"status": "Profesor creado en SQLite y pendiente de sincronización"}

@app.put("/profesores/{id}")
def update_profesor(id: int, prof: schemas.Profesor):
    data = prof.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.update_profesor(id, data)
    except Exception as e:
        logger.error(f"Error actualizando profesor en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error actualizando profesor en SQLite.")
    return {"status": "Profesor actualizado en SQLite y pendiente de sincronización"}

@app.delete("/profesores/{id}")
def delete_profesor(id: int):
    try:
        api_sqlite.delete_profesor(id)
    except Exception as e:
        logger.error(f"Error eliminando profesor en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error eliminando profesor en SQLite.")
    return {"status": "Profesor eliminado de SQLite y pendiente de sincronización"}

# === MATRICULAS ===
@app.get("/matriculas", response_model=List[schemas.Matricula])
def get_matriculas():
    data = get_data_with_fallback(api_mysql.get_matriculas)
    if not data:
        data = get_data_with_fallback(api_sqlite.get_matriculas)
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de matrículas.")
    return data

@app.get("/matriculas/{id}", response_model=schemas.Matricula)
def get_matricula_by_id(id: int):
    data = get_data_with_fallback(lambda: api_mysql.get_matricula(id))
    if not data:
        data = get_data_with_fallback(lambda: api_sqlite.get_matricula(id))
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de la matrícula.")
    return data

@app.post("/matriculas")
def create_matricula(m: schemas.Matricula):
    data = m.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.create_matricula(data)
    except Exception as e:
        logger.error(f"Error creando matrícula en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creando matrícula en SQLite.")
    return {"status": "Matrícula creada en SQLite y pendiente de sincronización"}

@app.put("/matriculas/{id}")
def update_matricula(id: int, m: schemas.Matricula):
    data = m.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.update_matricula(id, data)
    except Exception as e:
        logger.error(f"Error actualizando matrícula en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error actualizando matrícula en SQLite.")
    return {"status": "Matrícula actualizada en SQLite y pendiente de sincronización"}

@app.delete("/matriculas/{id}")
def delete_matricula(id: int):
    try:
        api_sqlite.delete_matricula(id)
    except Exception as e:
        logger.error(f"Error eliminando matrícula en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error eliminando matrícula en SQLite.")
    return {"status": "Matrícula eliminada de SQLite y pendiente de sincronización"}

# === PROFECICLO ===
@app.get("/profeciclos", response_model=List[schemas.Profeciclo])
def get_profeciclos():
    data = get_data_with_fallback(api_mysql.get_profeciclos)
    if not data:
        data = get_data_with_fallback(api_sqlite.get_profeciclos)
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información de profeciclos.")
    return data

@app.get("/profeciclos/{id}", response_model=schemas.Profeciclo)
def get_profeciclo_by_id(id: int):
    data = get_data_with_fallback(lambda: api_mysql.get_profeciclo(id))
    if not data:
        data = get_data_with_fallback(lambda: api_sqlite.get_profeciclo(id))
    if not data:
        raise HTTPException(status_code=500, detail="No se pudo obtener la información del profeciclo.")
    return data

@app.post("/profeciclos")
def create_profeciclo(p: schemas.Profeciclo):
    data = p.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.create_profeciclo(data)
    except Exception as e:
        logger.error(f"Error creando profeciclo en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creando profeciclo en SQLite.")
    return {"status": "Profeciclo creado en SQLite y pendiente de sincronización"}

@app.put("/profeciclos/{id}")
def update_profeciclo(id: int, p: schemas.Profeciclo):
    data = p.dict()
    data["flag_sync"] = False  # Marcar como pendiente de sincronización
    try:
        api_sqlite.update_profeciclo(id, data)
    except Exception as e:
        logger.error(f"Error actualizando profeciclo en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error actualizando profeciclo en SQLite.")
    return {"status": "Profeciclo actualizado en SQLite y pendiente de sincronización"}

@app.delete("/profeciclos/{id}")
def delete_profeciclo(id: int):
    try:
        api_sqlite.delete_profeciclo(id)
    except Exception as e:
        logger.error(f"Error eliminando profeciclo en SQLite: {str(e)}")
        raise HTTPException(status_code=500, detail="Error eliminando profeciclo en SQLite.")
    return {"status": "Profeciclo eliminado de SQLite y pendiente de sincronización"}
