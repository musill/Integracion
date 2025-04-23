# sync_logic.py

from api_clients import api_sqlite, api_mysql
import requests

def sync_estudiantes():
    pendientes = api_sqlite.get_pending_estudiantes()
    for est in pendientes:
        payload = {
            "ID": est["id"],
            "Nombre": est["nombre"],
            "FlagSync": True
        }

        existing = requests.get(f"http://localhost:8080/estudiantes/{est['id']}")
        if existing.status_code == 200:
            response = api_mysql.update_estudiante_mysql(est["id"], payload)
        else:
            response = api_mysql.create_estudiante_mysql(payload)

        if response.status_code in (200, 201):
            api_sqlite.mark_estudiante_synced(est["id"])


def sync_profesores():
    pendientes = api_mysql.get_pending_profesores()
    for prof in pendientes:
        payload = {
            "id": prof["IDProfesor"],           
            "nombre": prof["Nombre"],
            "flag_sync": True
        }
        response = api_sqlite.create_or_update_profesor(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_profesor_synced(prof["IDProfesor"])



def sync_asignaturas():
    pendientes = api_mysql.get_pending_asignaturas()
    for asignatura in pendientes:
        payload = {
            "IDAsignatura": asignatura["IDAsignatura"],
            "Nombre": asignatura["Nombre"],
            "FlagSync": True
        }
        response = api_sqlite.create_or_update_asignatura(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_asignatura_synced(asignatura["IDAsignatura"])


def sync_profeciclos():
    pendientes = api_mysql.get_pending_profeciclos()
    for profeciclo in pendientes:
        payload = {
            "ID": profeciclo["ID"],
            "IDCiclo": profeciclo["ID"],
            "IDProfesor": profeciclo["IDProfesor"],
            "IDAsignatura": profeciclo["IDAsignatura"],
            "Ciclo": profeciclo["Ciclo"],
            "FlagSync": True
        }
        response = api_sqlite.create_or_update_profeciclo(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_profeciclo_synced(profeciclo["ID"])


def sync_matriculas():
    pendientes = api_sqlite.get_pending_matriculas()
    for m in pendientes:
        payload = {
            "ID": m["id"],
            "IDEstudiante": m["idestudiante"],
            "IDAsignatura": m["idasignatura"],
            "IDCiclo": m["id_ciclo"],
            "NotaUno": None,
            "NotaDos": None,
            "Supletorio": None,
            "FlagSync": True
        }
        response = api_mysql.create_or_update_matricula(payload)
        if response.status_code in [200, 201]:
            api_sqlite.mark_matricula_synced(m["id"])


def sync_notas_matricula():
    pendientes = api_mysql.get_pending_matriculas()
    for m in pendientes:
        payload = {
            "ID": m["ID"],
            "NotaUno": m["NotaUno"],
            "NotaDos": m["NotaDos"],
            "Supletorio": m["Supletorio"],
            "FlagSync": True
        }
        response = api_sqlite.update_matricula_nota(m["ID"], payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_matricula_synced(m["ID"])
