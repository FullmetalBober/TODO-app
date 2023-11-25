from sqlalchemy.orm import Session
from app.models import Todo
from app.schemas import TodoSchema, TodoSchemaOptional


def get_todos(
    db: Session,
    sortDirection: int | None,
    searchQuery: str | None,
    complete: bool | None,
) -> list[Todo]:
    todos = db.query(Todo)
    # check complete
    if complete is not None:
        todos = todos.filter(Todo.complete == complete)
        # check search query
    if searchQuery is not None:
        todos = todos.filter(Todo.title.icontains(searchQuery))
    # check sort direction
    if sortDirection == 1:
        todos = todos.order_by(Todo.priority.asc())
    elif sortDirection == -1:
        todos = todos.order_by(Todo.priority.desc())
    else:
        todos = todos.order_by(Todo.created_at.desc())
    return todos.all()


def create_todo(db: Session, todo: TodoSchema):
    new_todo = Todo(**todo.model_dump())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


def get_todo_by_id(db: Session, id: int):
    return db.query(Todo).filter(Todo.id == id).one_or_none()


def update_todo_by_id(db: Session, todo_db: Todo, todo: TodoSchemaOptional):
    update_data = todo.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(todo_db, key, value)

    db.commit()
    db.refresh(todo_db)
    return todo_db


def delete_todo_by_id(db: Session, todo_db: Todo):
    db.delete(todo_db)
    db.commit()
