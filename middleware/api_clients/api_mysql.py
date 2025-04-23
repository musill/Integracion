# api_clients/api_mysql.py

import requests

BASE_URL = "http://localhost:8080"

def create_estudiante_mysql(estudiante):
    return requests.post(f"{BASE_URL}/estudiantes", json=estudiante)

def update_estudiante_mysql(estudiante_id, estudiante):
    return requests.put(f"{BASE_URL}/estudiantes/{estudiante_id}", json=estudiante)
