from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database.dependencies import get_db
from app.models.user import User

from app.crud.search import get_project_chunks
from app.schemas.search import SearchRequest
from app.services.search_service import find_similar_chunks

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.post("/{project_id}")
def search_project(
    project_id: UUID,
    request: SearchRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chunks = get_project_chunks(
        db,
        project_id,
    )

    results = find_similar_chunks(
        request.query,
        chunks,
    )

    return {
        "results": [
            chunk.content
            for chunk in results
        ]
    }