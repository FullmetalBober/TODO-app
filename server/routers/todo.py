from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
import models
from database import engine, SessionLocal

router = APIRouter(prefix="/todo", tags=["todo"])

models.Base.metadata.create_all(bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Todo(BaseModel):
    title: str = Field(..., example="Buy Milk")
    priority: int = Field(..., example=5)
    complete: bool = Field(False, example=False)


@router.get("/")
def get_todos(db: Session = Depends(get_db)):
    return db.query(models.Todo).all()


@router.post("/")
def create_todo(todo: Todo, db: Session = Depends(get_db)):
    new_todo = models.Todo(
        title=todo.title, priority=todo.priority, complete=todo.complete
    )
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo
