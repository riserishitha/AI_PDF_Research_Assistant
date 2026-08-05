from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse

from app.services.llm_service import stream_llm
from app.database.dependencies import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

from app.schemas.chat import ChatRequest
from app.schemas.chat import ChatResponse

from app.crud.search import get_project_chunks
from app.services.search_service import find_similar_chunks

from app.services.llm_service import ask_llm
from app.crud.chat import create_chat

from typing import List
from app.crud.chat import get_project_chats
from app.schemas.chat import ChatHistoryResponse
router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)
@router.post(
    "/{project_id}",
    response_model=ChatResponse,
)
def chat(
    project_id: UUID,
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Step 1: Retrieve all chunks for the project
    chunks = get_project_chunks(db, project_id)

    # Step 2: Find similar chunks based on the user's question
    similar_chunks = find_similar_chunks(request.question, chunks)

    # Step 3: Create context from the similar chunks
    context = "\n\n".join(
        chunk.content
        for chunk in similar_chunks
    )

    # Step 4: Ask the LLM with the question and context
    answer = ask_llm(
        request.question,
        context,
    )

    create_chat(
        db=db,
        project_id=project_id,
        question=request.question,
        answer=answer,
    )

    return ChatResponse(
        answer=answer,
    )

@router.get(
    "/{project_id}/history",
    response_model=List[ChatHistoryResponse],
)
def get_chat_history(
    project_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_project_chats(
        db,
        project_id,
    )
@router.post("/{project_id}/stream")
def stream_chat(
    project_id: UUID,
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chunks = get_project_chunks(
        db,
        project_id,
    )

    similar_chunks = find_similar_chunks(
        request.question,
        chunks,
    )

    context = "\n\n".join(
        chunk.content
        for chunk in similar_chunks
    )

    def generate():
        answer = ""

        for piece in stream_llm(
            request.question,
            context,
        ):
            answer += piece
            yield piece

        create_chat(
            db=db,
            project_id=project_id,
            question=request.question,
            answer=answer,
        )

    return StreamingResponse(
        generate(),
        media_type="text/plain",
    )