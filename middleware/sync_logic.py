# sync_logic.py

from api_clients import api_mysql, api_sqlite
from models.schemas import Estudiante, Profesor, Asignatura, Matricula, Profeciclo
from utils import select_primary_source, records_differ

def sync_entidad(nombre, get_sqlite, get_mysql, create_sqlite, create_mysql):
    try:
        datos_sqlite = get_sqlite()
    except Exception as e:
        print(f"[{nombre}] Error al obtener datos de SQLite: {e}")
        datos_sqlite = None

    try:
        datos_mysql = get_mysql()
    except Exception as e:
        print(f"[{nombre}] Error al obtener datos de MySQL: {e}")
        datos_mysql = None

    if datos_sqlite is None and datos_mysql is None:
        print(f"[{nombre}] Error crítico: ambas fuentes están caídas.")
        return

    datos_primarios = select_primary_source(datos_sqlite, datos_mysql)
    datos_secundarios = datos_mysql if datos_primarios == datos_sqlite else datos_sqlite
    create_secundario = create_mysql if datos_primarios == datos_sqlite else create_sqlite

    for registro in datos_primarios:
        id_registro = registro.get("id") or registro.get("id_estudiante") or registro.get("id_profesor")  # adaptar según entidad
        duplicado = any(
            r.get("id") == id_registro for r in datos_secundarios
        ) if datos_secundarios else False

        if not duplicado:
            try:
                create_secundario(registro)
                print(f"[{nombre}] Registro sincronizado: {id_registro}")
            except Exception as e:
                print(f"[{nombre}] Error al sincronizar {id_registro}: {e}")

def sync_all():
    sync_entidad(
        "Estudiantes",
        api_sqlite.get_all_estudiantes,
        api_mysql.get_all_estudiantes,
        api_sqlite.create_estudiante,
        api_mysql.create_estudiante,
    )
    sync_entidad(
        "Profesores",
        api_sqlite.get_all_profesores,
        api_mysql.get_all_profesores,
        api_sqlite.create_profesor,
        api_mysql.create_profesor,
    )
    sync_entidad(
        "Asignaturas",
        api_sqlite.get_all_asignaturas,
        api_mysql.get_all_asignaturas,
        api_sqlite.create_asignatura,
        api_mysql.create_asignatura,
    )
    sync_entidad(
        "Matricula",
        api_sqlite.get_all_matricula,
        api_mysql.get_all_matricula,
        api_sqlite.create_matricula,
        api_mysql.create_matricula,
    )
    sync_entidad(
        "Profeciclo",
        api_sqlite.get_all_profeciclo,
        api_mysql.get_all_profeciclo,
        api_sqlite.create_profeciclo,
        api_mysql.create_profeciclo,
    )
