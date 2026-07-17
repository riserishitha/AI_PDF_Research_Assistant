from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


def create_document_chunk(
    db: Session,
    document_id,
    chunk_index: int,
    content: str,
):
    chunk = DocumentChunk(
        document_id=document_id,
        chunk_index=chunk_index,
        content=content,
    )

    db.add(chunk)

    return chunk


def create_document_chunks(
    db: Session,
    document_id,
    chunks: list[str],
):
    for index, chunk in enumerate(chunks):
        create_document_chunk(
            db=db,
            document_id=document_id,
            chunk_index=index,
            content=chunk,
        )

    db.commit()