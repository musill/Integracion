# api_clients/api_mysql.py

import requests

BASE_URL = "http://localhost:8080"

def create_estudiante_mysql(estudiante):
    return requests.post(f"{BASE_URL}/estudiantes", json=estudiante)

def update_estudiante_mysql(estudiante_id, estudiante):
    return requests.put(f"{BASE_URL}/estudiantes/{estudiante_id}", json=estudiante)


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
    res = requests.get(f"{BASE_URL}/profeciclo/pendientes")
    return res.json()

def mark_profeciclo_synced(idprofeciclo):
    return requests.put(f"{BASE_URL}/profeciclo/{idprofeciclo}/sync")


def create_or_update_matricula(matricula):
    return requests.put(f"{BASE_URL}/matricula/{matricula['id']}", json=matricula)
