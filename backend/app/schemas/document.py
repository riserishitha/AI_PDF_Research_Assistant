from uuid import UUID

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: UUID
    original_name: str
    stored_name: str
    file_type: str
    file_size: int
    file_path: str
    project_id: UUID

    class Config:
        from_attributes = True