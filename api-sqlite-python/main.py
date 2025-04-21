from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, database, crud, schemas

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try: yield db
    finally: db.close()

# -------- Estudiantes --------
@app.post("/estudiantes/", response_model=schemas.Estudiante)
def create_est(est: schemas.EstudianteCreate, db: Session = Depends(get_db)):
    return crud.create_estudiante(db, est)

@app.get("/estudiantes/", response_model=list[schemas.Estudiante])
def read_ests(db: Session = Depends(get_db)):
    return crud.get_estudiantes(db)

@app.get("/estudiantes/{est_id}", response_model=schemas.Estudiante)
def read_est(est_id: str, db: Session = Depends(get_db)):
    return crud.get_estudiante_by_id(db, est_id)

@app.put("/estudiantes/{est_id}", response_model=schemas.Estudiante)
def update_est(est_id: str, obj: schemas.EstudianteCreate, db: Session = Depends(get_db)):
    return crud.update_estudiante(db, est_id, obj)

@app.delete("/estudiantes/{est_id}")
def delete_est(est_id: str, db: Session = Depends(get_db)):
    return crud.delete_estudiante(db, est_id)

@app.get("/estudiantes/pending", response_model=list[schemas.Estudiante])
def pending_ests(db: Session = Depends(get_db)):
    return crud.get_pending_estudiantes(db)

@app.patch("/estudiantes/{est_id}/flag")
def update_flag(est_id: str, db: Session = Depends(get_db)):
    return crud.update_flag_estudiante(db, est_id)

# -------- Asignaturas --------
@app.post("/asignaturas/", response_model=schemas.Asignatura)
def create_asig(obj: schemas.AsignaturaCreate, db: Session = Depends(get_db)):
    return crud.create_asignatura(db, obj)

@app.get("/asignaturas/", response_model=list[schemas.Asignatura])
def read_asigs(db: Session = Depends(get_db)):
    return crud.get_asignaturas(db)

@app.get("/asignaturas/{idasig}", response_model=schemas.Asignatura)
def read_asig(idasig: int, db: Session = Depends(get_db)):
    return crud.get_asignatura_by_id(db, idasig)

@app.get("/asignaturas/pending", response_model=list[schemas.Asignatura])
def pending_asigs(db: Session = Depends(get_db)):
    return crud.get_pending_asignaturas(db)

@app.patch("/asignaturas/{idasig}/flag")
def update_flag_asig(idasig: int, db: Session = Depends(get_db)):
    return crud.update_flag_asignatura(db, idasig)

# -------- Profesores --------
@app.post("/profesores/", response_model=schemas.Profesor)
def create_prof(obj: schemas.ProfesorCreate, db: Session = Depends(get_db)):
    return crud.create_profesor(db, obj)

@app.get("/profesores/", response_model=list[schemas.Profesor])
def read_profs(db: Session = Depends(get_db)):
    return crud.get_profesores(db)

@app.get("/profesores/{idprof}", response_model=schemas.Profesor)
def read_prof(idprof: int, db: Session = Depends(get_db)):
    return crud.get_profesor_by_id(db, idprof)

@app.get("/profesores/pending", response_model=list[schemas.Profesor])
def pending_profs(db: Session = Depends(get_db)):
    return crud.get_pending_profesores(db)

@app.patch("/profesores/{idprof}/flag")
def update_flag_prof(idprof: int, db: Session = Depends(get_db)):
    return crud.update_flag_profesor(db, idprof)

# -------- Matricula --------
@app.post("/matricula/", response_model=schemas.Matricula)
def create_matricula(obj: schemas.MatriculaCreate, db: Session = Depends(get_db)):
    return crud.create_matricula(db, obj)

@app.get("/matricula/", response_model=list[schemas.Matricula])
def read_matriculas(db: Session = Depends(get_db)):
    return crud.get_matriculas(db)

@app.get("/matricula/{id}", response_model=schemas.Matricula)
def read_matricula(id: int, db: Session = Depends(get_db)):
    return crud.get_matricula_by_id(db, id)

@app.put("/matricula/{id}", response_model=schemas.Matricula)
def update_matricula(id: int, obj: schemas.MatriculaCreate, db: Session = Depends(get_db)):
    return crud.update_matricula(db, id, obj)

@app.delete("/matricula/{id}")
def delete_matricula(id: int, db: Session = Depends(get_db)):
    return crud.delete_matricula(db, id)

@app.get("/matricula/pending", response_model=list[schemas.Matricula])
def pending_matriculas(db: Session = Depends(get_db)):
    return crud.get_pending_matriculas(db)

@app.patch("/matricula/{id}/flag")
def update_flag_matricula(id: int, db: Session = Depends(get_db)):
    return crud.update_flag_matricula(db, id)

# -------- Profeciclo --------
@app.post("/profeciclo/", response_model=schemas.Profeciclo)
def create_profeciclo(obj: schemas.ProfecicloCreate, db: Session = Depends(get_db)):
    return crud.create_profeciclo(db, obj)

@app.get("/profeciclo/", response_model=list[schemas.Profeciclo])
def read_profeciclos(db: Session = Depends(get_db)):
    return crud.get_profeciclos(db)

@app.get("/profeciclo/{id}", response_model=schemas.Profeciclo)
def read_profeciclo(id: int, db: Session = Depends(get_db)):
    return crud.get_profeciclo_by_id(db, id)

@app.get("/profeciclo/pending", response_model=list[schemas.Profeciclo])
def pending_profeciclos(db: Session = Depends(get_db)):
    return crud.get_pending_profeciclos(db)

@app.patch("/profeciclo/{id}/flag")
def update_flag_profeciclo(id: int, db: Session = Depends(get_db)):
    return crud.update_flag_profeciclo(db, id)
