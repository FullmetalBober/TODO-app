import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import todoRouter
from app.config import engine
from app import models

origins = ["http://localhost:3000"]


def init_app():
    models.Base.metadata.create_all(bind=engine)

    app = FastAPI(
        title="TODO API",
        version="1",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(todoRouter.router, prefix="/todos", tags=["todo"])

    return app


app = init_app()


def start():
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)
