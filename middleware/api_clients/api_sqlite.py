# api_clients/api_sqlite.py
import requests
from models.schemas import EstudianteCreate



BASE_URL = "http://localhost:8000"  # Cambia esto si tu API SQLite está en otro puerto

# --- Estudiantes ---
def get_estudiantes():
    return requests.get(f"{BASE_URL}/estudiantes").json()

def get_estudiante(id):
    return requests.get(f"{BASE_URL}/estudiantes/{id}").json()

def create_estudiante(data):
    return requests.post(f"{BASE_URL}/estudiantes", json=data).json()

def update_estudiante(id, data):
    return requests.put(f"{BASE_URL}/estudiantes/{id}", json=data).json()

def delete_estudiante(id):
    return requests.delete(f"{BASE_URL}/estudiantes/{id}").json()


# --- Profesores ---
def get_profesores():
    return requests.get(f"{BASE_URL}/profesores").json()

def get_profesor(id):
    return requests.get(f"{BASE_URL}/profesores/{id}").json()

def create_profesor(data):
    return requests.post(f"{BASE_URL}/profesores", json=data).json()

def update_profesor(id, data):
    return requests.put(f"{BASE_URL}/profesores/{id}", json=data).json()

def delete_profesor(id):
    return requests.delete(f"{BASE_URL}/profesores/{id}").json()


# --- Asignaturas ---
def get_asignaturas():
    return requests.get(f"{BASE_URL}/asignaturas").json()

def get_asignatura(id):
    return requests.get(f"{BASE_URL}/asignaturas/{id}").json()

def create_asignatura(data):
    return requests.post(f"{BASE_URL}/asignaturas", json=data).json()

def update_asignatura(id, data):
    return requests.put(f"{BASE_URL}/asignaturas/{id}", json=data).json()

def delete_asignatura(id):
    return requests.delete(f"{BASE_URL}/asignaturas/{id}").json()


# --- Matrícula ---
def get_matriculas():
    return requests.get(f"{BASE_URL}/matricula").json()

def get_matricula(id):
    return requests.get(f"{BASE_URL}/matricula/{id}").json()

def create_matricula(data):
    return requests.post(f"{BASE_URL}/matricula", json=data).json()

def update_matricula(id, data):
    return requests.put(f"{BASE_URL}/matricula/{id}", json=data).json()

def delete_matricula(id):
    return requests.delete(f"{BASE_URL}/matricula/{id}").json()


# --- Profeciclo ---
def get_profeciclos():
    return requests.get(f"{BASE_URL}/profeciclo").json()

def get_profeciclo(id):
    return requests.get(f"{BASE_URL}/profeciclo/{id}").json()

def create_profeciclo(data):
    return requests.post(f"{BASE_URL}/profeciclo", json=data).json()

def update_profeciclo(id, data):
    return requests.put(f"{BASE_URL}/profeciclo/{id}", json=data).json()

def delete_profeciclo(id):
    return requests.delete(f"{BASE_URL}/profeciclo/{id}").json()
