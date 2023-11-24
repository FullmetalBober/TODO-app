from sqlalchemy.orm import Session
from app.models import Todo
from app.schemas import TodoSchema, TodoSchemaOptional


def get_todos(db: Session, sortDirection, q):
    todos = db.query(Todo)
    if sortDirection == 1:
        todos = todos.order_by(Todo.priority.desc())
    elif sortDirection == -1:
        todos = todos.order_by(Todo.priority.asc())
    else:
        todos = todos.order_by(Todo.updated_at.desc())
    if q is not None:
        todos = todos.filter(Todo.title.icontains(q))
    return todos.all()


def create_todo(db: Session, todo: TodoSchema):
    new_todo = Todo(**todo.model_dump())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


def get_todo_by_id(db: Session, id):
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
    return
