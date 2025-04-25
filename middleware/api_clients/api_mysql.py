# api_clients/api_mysql.py

import requests

BASE_URL = "http://localhost:8080"
#BASE_URL = "http://10.79.17.241:8080"
def create_estudiante_mysql(estudiante):
    return requests.post(f"{BASE_URL}/estudiantes", json=estudiante)

def update_estudiante_mysql(estudiante_id, estudiante):
    return requests.put(f"{BASE_URL}/estudiantes/{estudiante_id}", json=estudiante)
def mark_estudiante_synced(est_id):
    return requests.put(f"{BASE_URL}/estudiantes/{est_id}/sync")


def get_pending_profesores():
    res = requests.get(f"{BASE_URL}/profesores/pendientes")
    return res.json()

def mark_profesor_synced(idprof):
    return requests.put(f"{BASE_URL}/profesores/{idprof}/sync")

def get_pending_asignaturas():
    res = requests.get(f"{BASE_URL}/asignaturas/pendientes")
    return res.json()

def mark_asignatura_synced(idasig):
    return requests.put(f"{BASE_URL}/asignaturas/{idasig}/sync")


def get_pending_profeciclos():
    return requests.get(f"{BASE_URL}/profeciclo/pendientes").json()

def mark_profeciclo_synced(id_):
    return requests.put(f"{BASE_URL}/profeciclo/{id_}/sync")

def create_or_update_matricula(matricula):
    return requests.put(f"{BASE_URL}/matricula/{matricula['id']}", json=matricula)

def get_pending_matriculas():
    res = requests.get(f"{BASE_URL}/matricula/pendientes")
    res.raise_for_status()
    return res.json()
def mark_matricula_synced(matricula_id):
    return requests.put(f"{BASE_URL}/matricula/{matricula_id}/sync")
