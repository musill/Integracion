from apscheduler.schedulers.background import BackgroundScheduler


from sync_logic import (
    sync_estudiantes,
    sync_profesores,
    sync_asignaturas,
    sync_matricula,
    sync_profeciclo
)

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(sync_estudiantes, "interval", seconds=60)
    scheduler.add_job(sync_profesores, "interval", seconds=60)
    scheduler.add_job(sync_asignaturas, "interval", seconds=60)
    scheduler.add_job(sync_matricula, "interval", seconds=60)
    scheduler.add_job(sync_profeciclo, "interval", seconds=60)
    scheduler.start()