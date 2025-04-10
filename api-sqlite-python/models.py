from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey
from database import Base

class Estudiante(Base):
    __tablename__ = "estudiantes"
    id = Column(String, primary_key=True, index=True)  # cedula
    nombre = Column(String)
    flag_sync = Column(Boolean, default=False)

class Asignatura(Base):
    __tablename__ = "asignaturas"
    idasignatura = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    flag_sync = Column(Boolean, default=False)

class Profesor(Base):
    __tablename__ = "profesores"
    idprofesor = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    flag_sync = Column(Boolean, default=False)

class Matricula(Base):
    __tablename__ = "matricula"
    id = Column(Integer, primary_key=True, index=True)
    id_estudiante = Column(String, ForeignKey("estudiantes.id"))
    id_asignatura = Column(Integer, ForeignKey("asignaturas.idasignatura"))
    id_ciclo = Column(Integer)
    notauno = Column(Float)
    notados = Column(Float)
    supletorio = Column(Float)
    flag_sync = Column(Boolean, default=False)

class Profeciclo(Base):
    __tablename__ = "profeciclo"
    id = Column(Integer, primary_key=True, index=True)
    ciclo = Column(String)  # texto: fecha de inicio - fin
    id_profesor = Column(Integer, ForeignKey("profesores.idprofesor"))
    id_asignatura = Column(Integer, ForeignKey("asignaturas.idasignatura"))
    flag_sync = Column(Boolean, default=False)
