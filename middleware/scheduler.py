# scheduler.py

from apscheduler.schedulers.background import BackgroundScheduler
from sync_logic import (
    sync_estudiantes,
    sync_profesores,
    sync_asignaturas,
    sync_profeciclos,
    sync_matriculas,
    sync_notas_matricula,
)

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(sync_estudiantes, 'interval', seconds=10)         # SQLite -> MySQL
    scheduler.add_job(sync_profesores, 'interval', seconds=10)          # MySQL -> SQLite
    scheduler.add_job(sync_asignaturas, 'interval', seconds=10)         # MySQL -> SQLite
    scheduler.add_job(sync_profeciclos, 'interval', seconds=10)         # MySQL -> SQLite
    scheduler.add_job(sync_matriculas, 'interval', seconds=10)          # SQLite -> MySQL (sin nota)
    scheduler.add_job(sync_notas_matricula, 'interval', seconds=10)     # MySQL -> SQLite (solo nota)
    scheduler.start()