from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

from app.schemas.chat import ChatRequest
from app.schemas.chat import ChatResponse

from app.crud.search import get_project_chunks
from app.services.search_service import find_similar_chunks

from app.services.llm_service import ask_llm

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
    answer = ask_llm(request.question, context)

    return ChatResponse(answer=answer)