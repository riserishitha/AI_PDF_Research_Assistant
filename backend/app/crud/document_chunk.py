from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk
from app.services.embedding_service import generate_embedding


def create_document_chunk(
    db: Session,
    document_id,
    chunk_index: int,
    content: str,
):
    print(f"Creating chunk {chunk_index}")

    embedding = generate_embedding(content)

    print(f"Embedding generated: {embedding is not None}")
    print(f"Embedding length: {len(embedding)}")

    chunk = DocumentChunk(
        document_id=document_id,
        chunk_index=chunk_index,
        content=content,
        embedding=embedding,
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