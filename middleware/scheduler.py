from apscheduler.schedulers.background import BackgroundScheduler
from sync_logic import sync_estudiantes  # importa otros también

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(sync_estudiantes, "interval", seconds=60)
    # Agrega más trabajos si deseas dividir por entidad
    scheduler.start()
