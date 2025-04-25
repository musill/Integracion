from fastapi import HTTPException
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

def get_estudiante_by_id(db: Session, est_id: str):
    return db.query(models.Estudiante).filter(models.Estudiante.id == est_id).first()

def update_estudiante(db: Session, est_id: str, obj: schemas.EstudianteCreate):
    db_obj = db.query(models.Estudiante).filter(models.Estudiante.id == est_id).first()
    if db_obj:
        for key, value in obj.dict().items():
            setattr(db_obj, key, value)
            db_obj.flag_sync = False  
        db.commit()
        db.refresh(db_obj)
    return db_obj

def delete_estudiante(db: Session, est_id: str):
    db_obj = db.query(models.Estudiante).filter(models.Estudiante.id == est_id).first()
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return {"mensaje": "Estudiante eliminado con éxito"}

def get_pending_estudiantes(db: Session):
    return db.query(models.Estudiante).filter(models.Estudiante.flag_sync == False).all()

def update_flag_estudiante(db: Session, est_id: str):
    est = db.query(models.Estudiante).filter(models.Estudiante.id == est_id).first()
    if est:
        est.flag_sync = True
        db.commit()
    return est

### -------- Asignatura --------

def create_or_update_asignatura(db: Session, idasig: int, obj: schemas.AsignaturaCreate):
    db_obj = db.query(models.Asignatura).filter(models.Asignatura.idasignatura == idasig).first()
    if db_obj:
        for key, value in obj.dict().items():
            setattr(db_obj, key, value)
        db_obj.flag_sync = False
        db.commit()
        db.refresh(db_obj)
        return db_obj
    else:
        data = obj.dict()
        data.pop("idasignatura", None)  # 💡 quitar para evitar duplicado
        new_obj = models.Asignatura(idasignatura=idasig, **data)
        new_obj.flag_sync = False
        db.add(new_obj)
        db.commit()
        db.refresh(new_obj)
        return new_obj

def create_asignatura(db: Session, obj: schemas.AsignaturaCreate):
    db_obj = models.Asignatura(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_asignaturas(db: Session):
    return db.query(models.Asignatura).all()

def get_update_asignatura(db: Session, idasig: int, obj: schemas.AsignaturaCreate):
    db_obj = db.query(models.Asignatura).filter(models.Asignatura.idasignatura == idasig).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Asignatura no encontrada")
    for key, value in obj.dict().items():
        setattr(db_obj, key, value)
    db_obj.flag_sync = False
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_asignatura_by_id(db: Session, idasig: int):
    return db.query(models.Asignatura).filter(models.Asignatura.idasignatura == idasig).first()

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

def get_profesor_by_id(db: Session, idprof: int):
    return db.query(models.Profesor).filter(models.Profesor.idprofesor == idprof).first()


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

def get_matricula_by_id(db: Session, id: int):
    return db.query(models.Matricula).filter(models.Matricula.id == id).first()

def update_matricula(db: Session, id: int, obj: schemas.MatriculaCreate):
        db_obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
        if db_obj:
            for key, value in obj.dict().items():
                setattr(db_obj, key, value)
            db_obj.flag_sync = False  
            db.commit()
            db.refresh(db_obj)
        return db_obj

def delete_matricula(db: Session, id: int): 
    db_obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if db_obj:
        db.delete(db_obj)
        db.commit()
    return {"mensaje": "Matrícula eliminada con éxito"}

def get_pending_matriculas(db: Session):
    return db.query(models.Matricula).filter(models.Matricula.flag_sync == False).all()

def update_flag_matricula(db: Session, id: int):
    obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj

def update_notas_matricula(db: Session, id: int, obj: schemas.MatriculaNotasUpdate):
    db_obj = db.query(models.Matricula).filter(models.Matricula.id == id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Matrícula no encontrada")
    db_obj.notauno = obj.notauno
    db_obj.notados = obj.notados
    db_obj.supletorio = obj.supletorio
    db_obj.flag_sync = False
    db.commit()
    db.refresh(db_obj)
    return db_obj

### -------- Profeciclo --------
def create_profeciclo(db: Session, obj: schemas.ProfecicloCreate):
    db_obj = models.Profeciclo(**obj.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_profeciclos(db: Session):
    return db.query(models.Profeciclo).all()

def get_profeciclo_by_id(db: Session, id: int):
    return db.query(models.Profeciclo).filter(models.Profeciclo.id == id).first()

def get_pending_profeciclos(db: Session):
    return db.query(models.Profeciclo).filter(models.Profeciclo.flag_sync == False).all()

def update_flag_profeciclo(db: Session, id: int):
    obj = db.query(models.Profeciclo).filter(models.Profeciclo.id == id).first()
    if obj:
        obj.flag_sync = True
        db.commit()
    return obj
def get_update_profeciclo(db: Session, id: int, obj: schemas.ProfecicloCreate):
    db_obj = db.query(models.Profeciclo).filter(models.Profeciclo.id == id).first()
    if not db_obj:
        raise HTTPException(status_code=404, detail="Profeciclo no encontrado")
    for key, value in obj.dict().items():
        setattr(db_obj, key, value)
    db_obj.flag_sync = False
    db.commit()
    db.refresh(db_obj)
    return db_obj

def create_or_update_profeciclo(db: Session, id: int, obj: schemas.ProfecicloCreate):
    db_obj = db.query(models.Profeciclo).filter(models.Profeciclo.id == id).first()
    if db_obj:
        for key, value in obj.dict().items():
            setattr(db_obj, key, value)
        db_obj.flag_sync = False
        db.commit()
        db.refresh(db_obj)
        return db_obj
    else:
        new_obj = models.Profeciclo(id=id, **obj.dict())
        new_obj.flag_sync = False
        db.add(new_obj)
        db.commit()
        db.refresh(new_obj)
        return new_obj


