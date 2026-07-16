from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: UUID
    original_name: str
    stored_name: str
    file_type: str
    file_size: int
    project_id: UUID
    created_at: datetime

    class Config:
        from_attributes = Truefrom datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: UUID
    original_name: str
    stored_name: str
    file_type: str
    file_size: int
    project_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True