from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


def create_chunks(
    db: Session,
    document_id,
    chunks,
):
    db_chunks = []

    for index, chunk in enumerate(chunks):

        db_chunk = DocumentChunk(
            document_id=document_id,
            chunk_index=index,
            content=chunk,
        )

        db.add(db_chunk)
        db_chunks.append(db_chunk)

    db.commit()

    return db_chunks