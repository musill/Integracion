from fastapi import FastAPI
import scheduler

app = FastAPI()

@app.on_event("startup")
def start_scheduler():
    scheduler.start()
