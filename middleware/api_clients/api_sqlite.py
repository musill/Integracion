# api_clients/api_sqlite.py

import requests

#BASE_URL = "http://10.79.19.94:8000"
BASE_URL = "http://localhost:8000"
def get_pending_estudiantes():
    res = requests.get(f"{BASE_URL}/estudiantes/pending")
    return res.json()

def mark_estudiante_synced(est_id):
    requests.patch(f"{BASE_URL}/estudiantes/{est_id}/flag")
def create_or_update_asignatura(asignatura):
    return requests.put(f"{BASE_URL}/asignaturas/{asignatura['idasignatura']}", json=asignatura)


def get_pending_asignaturas():
    return requests.get(f"{BASE_URL}/asignaturas/pending").json()

def mark_asignatura_synced(idasig):
    requests.patch(f"{BASE_URL}/asignaturas/{idasig}/flag")

def create_or_update_profesor(profesor):
    # Se puede usar PUT directamente
    return requests.put(f"{BASE_URL}/profesores/{profesor['idprof']}", json=profesor)

# ya existe
def mark_profesor_synced(idprof):
    requests.patch(f"{BASE_URL}/profesores/{idprof}/flag")

def create_or_update_profeciclo(profeciclo):
    return requests.put(f"{BASE_URL}/profeciclo/{profeciclo['id']}", json=profeciclo)

def mark_profeciclo_synced(id_):
    return requests.patch(f"{BASE_URL}/profeciclo/{id_}/flag")



def get_pending_matriculas():
    res = requests.get(f"{BASE_URL}/matricula/pending")
    return res.json()

def mark_matricula_synced(matricula_id):
    return requests.patch(f"{BASE_URL}/matricula/{matricula_id}/flag")


def update_matricula_nota(idmatricula, data):
    return requests.put(f"{BASE_URL}/matricula/{idmatricula}/notas", json=data)
