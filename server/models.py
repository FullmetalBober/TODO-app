from database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import validates


class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    priority = Column(Integer, default=5)
    complete = Column(Boolean, default=False)

    @validates("priority")
    def validate_priority(self, key, priority):
        if priority < 0 or priority > 10:
            raise ValueError("Priority must be greater than 0 and less than 10")
        return priority
