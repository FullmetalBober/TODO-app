from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import validates
from app.config import Base


class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    priority = Column(Integer, default=5)
    complete = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    @validates("priority")
    def validate_priority(self, key, priority):
        if priority < 0 or priority > 10:
            raise ValueError("Priority must be greater than 0 and less than 10")
        return priority
