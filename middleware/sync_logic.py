# sync_logic.py

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
        response = api_mysql.create_estudiante_mysql(payload)
        if response.status_code == 200 or response.status_code == 201:
            api_sqlite.mark_estudiante_synced(est["id"])
