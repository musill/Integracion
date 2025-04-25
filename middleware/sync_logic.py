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
                api_mysql.mark_estudiante_synced(est["id"]) 


def sync_profesores():
    pendientes = api_mysql.get_pending_profesores()
    for prof in pendientes:
        payload = {
            "idprof": prof["IDProfesor"],     # usar la clave exacta
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
            "idasignatura": asignatura["IDAsignatura"],
            "nombre": asignatura["Nombre"],
            
        }
        response = api_sqlite.create_or_update_asignatura(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_asignatura_synced(asignatura["IDAsignatura"])
            api_sqlite.mark_asignatura_synced(asignatura["IDAsignatura"])


def sync_profeciclos():
    pendientes = api_mysql.get_pending_profeciclos()
    for profe in pendientes:
        payload = {
            "id": profe["ID"],
            "ciclo": profe["Ciclo"],
            "id_profesor": profe["IDProfesor"],
            "id_asignatura": profe["IDAsignatura"]
        }
        response = api_sqlite.create_or_update_profeciclo(payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_profeciclo_synced(profe["ID"])
            api_sqlite.mark_profeciclo_synced(profe["ID"])




def sync_matriculas():
    pendientes = api_sqlite.get_pending_matriculas()
    for m in pendientes:
        payload = {
            "id": m["id"],  # 👈 ¡esto es lo que faltaba!
            "IDEstudiante": m["id_estudiante"],
            "IDAsignatura": m["id_asignatura"],
            "IDCiclo": m["id_ciclo"],
            "NotaUno": m["notauno"],
            "NotaDos": m["notados"],
            "Supletorio": m["supletorio"],
            "FlagSync": True
        }
        response = api_mysql.create_or_update_matricula(payload)
        if response.status_code in [200, 201]:
            api_sqlite.mark_matricula_synced(m["id"])
            api_mysql.mark_matricula_synced(m["id"])


def sync_notas_matricula():
    pendientes = api_mysql.get_pending_matriculas()
    for m in pendientes:
        payload = {
            "id": m["ID"],
            "notauno": m["NotaUno"],
            "notados": m["NotaDos"],
            "supletorio": m["Supletorio"],
            "flag_sync": True
        }
        response = api_sqlite.update_matricula_nota(m["ID"], payload)
        if response.status_code in [200, 201]:
            api_mysql.mark_matricula_synced(m["ID"])
