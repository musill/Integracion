# sync_logic.py

import requests
from api_clients import api_sqlite, api_mysql

def sync_estudiantes():
    pendientes = api_sqlite.get_pending_estudiantes()
    for est in pendientes:
        payload = {
            "id": est["id"],
            "nombre": est["nombre"],
            "apellido": est["apellido"],
            "edad": est["edad"],
            "flag_sync": True
        }

        # Verificar si ya existe en MySQL
        existing = requests.get(f"http://localhost:8080/estudiantes/{est['id']}")
        if existing.status_code == 200:
            response = api_mysql.update_estudiante_mysql(est["id"], payload)
        else:
            response = api_mysql.create_estudiante_mysql(payload)

        if response.status_code in (200, 201):
            api_sqlite.mark_estudiante_synced(est["id"])


# sync_logic.py

from api_clients import api_sqlite, api_mysql

def sync_profesores():
    pendientes = api_mysql.get_pending_profesores()
    for prof in pendientes:
        payload = {
            "id": prof["id"],
            "nombre": prof["nombre"],
            "apellido": prof["apellido"],
            "titulo": prof["titulo"],
            "flag_sync": True
        }
        response = api_sqlite.create_or_update_profesor(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_profesor_synced(prof["id"])


def sync_asignaturas():
    pendientes = api_mysql.get_pending_asignaturas()
    for asignatura in pendientes:
        payload = {
            "id": asignatura["id"],
            "nombre": asignatura["nombre"],
            "creditos": asignatura["creditos"],
            "flag_sync": True
        }
        response = api_sqlite.create_or_update_asignatura(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_asignatura_synced(asignatura["id"])

            
def sync_profeciclos():
    pendientes = api_mysql.get_pending_profeciclos()
    for profeciclo in pendientes:
        payload = {
            "id": profeciclo["id"],
            "idprofesor": profeciclo["idprofesor"],
            "idasignatura": profeciclo["idasignatura"],
            "ciclo": profeciclo["ciclo"],
            "flag_sync": True
        }
        response = api_sqlite.create_or_update_profeciclo(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_profeciclo_synced(profeciclo["id"])
           


def sync_matriculas():
    pendientes = api_sqlite.get_pending_matriculas()
    for m in pendientes:
        payload = {
            "id": m["id"],
            "idestudiante": m["idestudiante"],
            "idprofeciclo": m["idprofeciclo"],
            # Omitimos la nota (o la mandamos como null)
            "nota": None,
            "flag_sync": True
        }
        response = api_mysql.create_or_update_matricula(payload)
        if response.status_code in [200, 201]:
            api_sqlite.mark_matricula_synced(m["id"])
           

def sync_notas_matricula():
    pendientes = api_mysql.get_pending_matriculas()
    for m in pendientes:
        # Solo enviamos el campo nota para actualizar
        payload = {
            "idestudiante": m["idestudiante"],
            "idprofeciclo": m["idprofeciclo"],
            "nota": m["nota"],
            "flag_sync": True
        }
        response = api_sqlite.update_matricula_nota(m["id"], payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_matricula_synced(m["id"])
