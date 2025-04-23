# api_clients/api_sqlite.py

import requests

BASE_URL = "http://localhost:8000"

def get_pending_estudiantes():
    res = requests.get(f"{BASE_URL}/estudiantes/pending")
    return res.json()

def mark_estudiante_synced(est_id):
    requests.patch(f"{BASE_URL}/estudiantes/{est_id}/flag")
