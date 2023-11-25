from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from app.config import SessionLocal
from app.services import todoService
from app.schemas import TodoSchema, TodoSchemaOptional

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_todos(
    q: str | None = None,
    sortDirection: int | None = None,
    complete: bool | None = None,
    db: Session = Depends(get_db),
):
    return todoService.get_todos(db, sortDirection, q, complete)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_todo(todo: TodoSchema, db: Session = Depends(get_db)):
    return todoService.create_todo(db, todo)


@router.patch("/{id}")
def update_todo(
    id: int,
    todo: TodoSchemaOptional,
    db: Session = Depends(get_db),
):
    todo_db = todoService.get_todo_by_id(db, id)
    if todo_db is None:
        raise http_not_found()
    return todoService.update_todo_by_id(db, todo_db, todo)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(
    id: int,
    db: Session = Depends(get_db),
):
    todo_db = todoService.get_todo_by_id(db, id)
    if todo_db is None:
        raise http_not_found()
    return todoService.delete_todo_by_id(db, todo_db)


def http_not_found():
    return HTTPException(status_code=404, detail="Todo not found")
