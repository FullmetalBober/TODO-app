from pydantic import BaseModel, Field
from typing import Optional


class TodoSchema(BaseModel):
    title: str = Field(min_length=1, example="Buy Milk")
    priority: int = Field(gt=0, lt=11, default=5, example=5)
    complete: bool = Field(False, example=False)


class TodoSchemaOptional(TodoSchema):
    title: Optional[str] = Field(None, min_length=1, example="Buy Milk")
    priority: Optional[int] = Field(None, gt=0, lt=11, example=5)
    complete: Optional[bool] = Field(None, example=False)
