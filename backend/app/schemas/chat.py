from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


class ChatHistoryResponse(BaseModel):
    id: UUID
    question: str
    answer: str
    created_at: datetime

    class Config:
        from_attributes = True