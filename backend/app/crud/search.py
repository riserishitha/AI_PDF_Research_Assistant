from uuid import UUID

from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.document_chunk import DocumentChunk


def get_project_chunks(
    db: Session,
    project_id: UUID,
):
    chunks = (
        db.query(DocumentChunk)
        .join(Document)
        .filter(Document.project_id == project_id)
        .all()
    )

    print(f"Found {len(chunks)} chunks")

    return chunks