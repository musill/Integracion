from sqlalchemy.orm import Session

import models, schemas

### -------- Estudiantes --------
def create_estudiante(db: Session, est: schemas.EstudianteCreate):
    db_obj = models.Estudiante(**est.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_estudiantes(db: Session):
    return db.query(models.Estudiante).all()

def get_pending_estudiantes(db: Session):
    return db.query(models.Estudiante).filter(models.Estudiante.flag_sync == False).all()

def update_flag_estudiante(db: Session, est_id: str):
    est = db.query(models.Estudiante).filter(models.Estudiante.id == est_id).first()
    if est:
        est.flag_sync = True
        db.commit()
    return est

### -------- Asignatura --------
def create_asignatura(db: Session, obj: schemas.AsignaturaCreate):
    db_obj = models.Asignatura(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_asignaturas(db: Session):
    return db.query(models.Asignatura).all()

def get_pending_asignaturas(db: Session):
    return db.query(models.Asignatura).filter(models.Asignatura.flag_sync == False).all()

def update_flag_asignatura(db: Session, idasig: int):
    obj = db.query(models.Asignatura).filter(models.Asignatura.idasignatura == idasig).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj

### -------- Profesor --------
def create_profesor(db: Session, obj: schemas.ProfesorCreate):
    db_obj = models.Profesor(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_profesores(db: Session):
    return db.query(models.Profesor).all()

def get_pending_profesores(db: Session):
    return db.query(models.Profesor).filter(models.Profesor.flag_sync == False).all()

def update_flag_profesor(db: Session, idprof: int):
    obj = db.query(models.Profesor).filter(models.Profesor.idprofesor == idprof).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj

### -------- Matricula --------
def create_matricula(db: Session, obj: schemas.MatriculaCreate):
    db_obj = models.Matricula(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_matriculas(db: Session):
    return db.query(models.Matricula).all()

def get_pending_matriculas(db: Session):
    return db.query(models.Matricula).filter(models.Matricula.flag_sync == False).all()

def update_flag_matricula(db: Session, id: int):
    obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj

### -------- Profeciclo --------
def create_profeciclo(db: Session, obj: schemas.ProfecicloCreate):
    db_obj = models.Profeciclo(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_profeciclos(db: Session):
    return db.query(models.Profeciclo).all()

def get_pending_profeciclos(db: Session):
    return db.query(models.Profeciclo).filter(models.Profeciclo.flag_sync == False).all()

def update_flag_profeciclo(db: Session, id: int):
    obj = db.query(models.Profeciclo).filter(models.Profeciclo.id == id).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj
