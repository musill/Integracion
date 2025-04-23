# scheduler.py

from apscheduler.schedulers.background import BackgroundScheduler
from sync_logic import sync_estudiantes

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(sync_estudiantes, 'interval', seconds=10)  # Ejecutar cada 60 segundos
    scheduler.start()
