from pydantic import BaseModel, Field
from typing import Optional


class TodoSchema(BaseModel):
    title: str = Field(..., example="Buy Milk")
    priority: int = Field(gt=0, lt=11, default=5, example=5)
    complete: bool = Field(False, example=False)


class TodoSchemaOptional(TodoSchema):
    title: Optional[str] = None
    priority: Optional[int] = None
    complete: Optional[bool] = None
