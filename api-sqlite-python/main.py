from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from fastapi.middleware.cors import CORSMiddleware
import models, database, crud, schemas
from fastapi.responses import JSONResponse

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Estudiantes --------
@app.post("/estudiantes/", response_model=schemas.Estudiante)
def create_est(est: schemas.EstudianteCreate, db: Session = Depends(get_db)):
    return crud.create_estudiante(db, est)

@app.put("/estudiantes/{est_id}", response_model=schemas.Estudiante)
def update_est(est_id: str, obj: schemas.EstudianteCreate, db: Session = Depends(get_db)):
    return crud.update_estudiante(db, est_id, obj)

@app.delete("/estudiantes/{est_id}")
def delete_est(est_id: str, db: Session = Depends(get_db)):
    return crud.delete_estudiante(db, est_id)

@app.delete("/estudiantes/definitivo/{id}")
def eliminar_definitivo(id: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return {"mensaje": "Estudiante eliminado con éxito"}


@app.get("/estudiantes/", response_model=list[schemas.Estudiante])
def read_ests(db: Session = Depends(get_db)):
    return crud.get_estudiantes(db)

@app.get("/estudiantes/pending")
def pending_ests(db: Session = Depends(get_db)):
    result = crud.get_pending_estudiantes(db)
    data = []
    for r in result:
        data.append({"id": r.id, "nombre": r.nombre, "flag_sync": r.flag_sync})
    return JSONResponse(content=data)

@app.get("/estudiantes/{est_id}", response_model=schemas.Estudiante)
def read_est(est_id: str, db: Session = Depends(get_db)):
    est = crud.get_estudiante_by_id(db, est_id)
    if est is None:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    return est

@app.patch("/estudiantes/{est_id}/flag")
def update_flag(est_id: str, db: Session = Depends(get_db)):
    estudiante = crud.update_flag_estudiante(db, est_id)
    if not estudiante:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    return {"msg": f"Estudiante {est_id} marcado como sincronizado"}

# -------- Asignaturas --------
@app.post("/asignaturas/", response_model=schemas.Asignatura)
def create_asig(obj: schemas.AsignaturaCreate, db: Session = Depends(get_db)):
    return crud.create_asignatura(db, obj)

@app.get("/asignaturas/", response_model=list[schemas.Asignatura])
def read_asigs(db: Session = Depends(get_db)):
    return crud.get_asignaturas(db)

@app.get("/asignaturas/pending")
def pending_asigs(db: Session = Depends(get_db)):
    result = crud.get_pending_asignaturas(db)
    data = []
    for r in result:
        data.append({"idasignatura": r.idasignatura, "nombre": r.nombre, "flag_sync": r.flag_sync})
    return JSONResponse(content=data)

@app.get("/asignaturas/{idasig}", response_model=schemas.Asignatura)
def read_asig(idasig: int, db: Session = Depends(get_db)):
    asig = crud.get_asignatura_by_id(db, idasig)
    if asig is None:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    return asig

@app.put("/asignaturas/{idasig}", response_model=schemas.Asignatura)
def update_asig(idasig: int, obj: schemas.AsignaturaCreate, db: Session = Depends(get_db)):
    return crud.get_update_asignatura(db, idasig, obj)

@app.patch("/asignaturas/{idasig}/flag")
def update_flag_asig(idasig: int, db: Session = Depends(get_db)):
    asignatura = crud.update_flag_asignatura(db, idasig)
    if not asignatura:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    return {"msg": f"Asignatura {idasig} marcada como sincronizada"}

# -------- Profesores --------
@app.post("/profesores/", response_model=schemas.Profesor)
def create_prof(obj: schemas.ProfesorCreate, db: Session = Depends(get_db)):
    return crud.create_profesor(db, obj)

@app.get("/profesores/", response_model=list[schemas.Profesor])
def read_profs(db: Session = Depends(get_db)):
    return crud.get_profesores(db)

@app.get("/profesores/pending")
def pending_profs(db: Session = Depends(get_db)):
    result = crud.get_pending_profesores(db)
    data = []
    for r in result:
        data.append({"idprofesor": r.idprofesor, "nombre": r.nombre, "flag_sync": r.flag_sync})
    return JSONResponse(content=data)

@app.put("/profesores/{idprof}", response_model=schemas.Profesor)
def update_prof(idprof: int, obj: schemas.ProfesorCreate, db: Session = Depends(get_db)):
    db_obj = db.query(models.Profesor).filter(models.Profesor.idprofesor == idprof).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    for key, value in obj.dict().items():
        setattr(db_obj, key, value)
    db_obj.flag_sync = False  
    db.commit()
    db.refresh(db_obj)
    return db_obj

@app.delete("/profesores/{idprof}")
def delete_prof(idprof: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Profesor).filter(models.Profesor.idprofesor == idprof).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    db.delete(db_obj)
    db.commit()
    return {"mensaje": "Profesor eliminado con éxito"}

@app.get("/profesores/{idprof}", response_model=schemas.Profesor)
def read_prof(idprof: int, db: Session = Depends(get_db)):
    prof = crud.get_profesor_by_id(db, idprof)
    if prof is None:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    return prof

@app.patch("/profesores/{idprof}/flag")
def update_flag_prof(idprof: int, db: Session = Depends(get_db)):
    profesor = crud.update_flag_profesor(db, idprof)
    if not profesor:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    return {"msg": f"Profesor {idprof} marcado como sincronizado"}

# -------- Matrícula --------
@app.post("/matricula/", response_model=schemas.Matricula)
def create_matricula(matricula: schemas.MatriculaCreate, db: Session = Depends(get_db)):
    # Log para verificar los datos recibidos
    print("Datos recibidos en el backend:", matricula.dict())
    try:
        db_matricula = models.Matricula(**matricula.dict())
        db.add(db_matricula)
        db.commit()
        db.refresh(db_matricula)
        return db_matricula
    except Exception as e:
        print("Error al crear matrícula:", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.get("/matricula/", response_model=list[schemas.Matricula])
def read_matriculas(db: Session = Depends(get_db)):
    return crud.get_matriculas(db)

@app.get("/matricula/pending")
def pending_matriculas(db: Session = Depends(get_db)):
    result = crud.get_pending_matriculas(db)
    data = []
    for r in result:
        data.append({"id": r.id, "id_estudiante": r.id_estudiante, "flag_sync": r.flag_sync})
    return JSONResponse(content=data)

@app.put("/matricula/{id}", response_model=schemas.Matricula)
def update_matricula(id: int, obj: schemas.MatriculaCreate, db: Session = Depends(get_db)):
    return crud.update_matricula(db, id, obj)

@app.delete("/matricula/{id}")
def delete_matricula(id: int, db: Session = Depends(get_db)):
    return crud.delete_matricula(db, id)

@app.delete("/matriculas/definitivo/{id}")
def eliminar_definitivo(id: int, db: Session = Depends(get_db)):
    db_obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return {"mensaje": "Matrícula eliminada definitivamente"}


@app.get("/matricula/{id}", response_model=schemas.Matricula)
def read_matricula(id: int, db: Session = Depends(get_db)):
    mat = crud.get_matricula_by_id(db, id)
    if mat is None:
        raise HTTPException(status_code=404, detail="Matrícula no encontrada")
    return mat

@app.patch("/matricula/{id}/flag")
def update_flag_matricula(id: int, db: Session = Depends(get_db)):
    matricula = crud.update_flag_matricula(db, id)
    if not matricula:
        raise HTTPException(status_code=404, detail="Matrícula no encontrada")
    return {"msg": f"Matrícula {id} marcada como sincronizada"}

# -------- Profeciclo --------
@app.post("/profeciclo/", response_model=schemas.Profeciclo)
def create_profeciclo(obj: schemas.ProfecicloCreate, db: Session = Depends(get_db)):
    return crud.create_profeciclo(db, obj)

@app.get("/profeciclo/", response_model=list[schemas.Profeciclo])
def read_profeciclos(db: Session = Depends(get_db)):
    return crud.get_profeciclos(db)

@app.get("/profeciclo/pending")
def pending_profeciclos(db: Session = Depends(get_db)):
    result = crud.get_pending_profeciclos(db)
    data = []
    for r in result:
        data.append({"id": r.id, "ciclo": r.ciclo, "flag_sync": r.flag_sync})
    return JSONResponse(content=data)

@app.get("/profeciclo/{id}", response_model=schemas.Profeciclo)
def read_profeciclo(id: int, db: Session = Depends(get_db)):
    ciclo = crud.get_profeciclo_by_id(db, id)
    if ciclo is None:
        raise HTTPException(status_code=404, detail="Profeciclo no encontrado")
    return ciclo

@app.patch("/profeciclo/{id}/flag")
def update_flag_profeciclo(id: int, db: Session = Depends(get_db)):
    profeciclo = crud.update_flag_profeciclo(db, id)
    if not profeciclo:
        raise HTTPException(status_code=404, detail="Profeciclo no encontrado")
    return {"msg": f"Profeciclo {id} marcado como sincronizado"}

@app.put("/profeciclo/{id}", response_model=schemas.Profeciclo)
def update_profeciclo(id: int, obj: schemas.ProfecicloCreate, db: Session = Depends(get_db)):
    return crud.get_update_profeciclo(db, id, obj)
