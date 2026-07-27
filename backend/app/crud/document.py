from sqlalchemy.orm import Session
import os
from app.models.document import Document


def create_document(
    db: Session,
    original_name: str,
    stored_name: str,
    file_type: str,
    file_size: int,
    file_path: str,
    project_id,
    extracted_text: str,
):
    document = Document(
        original_name=original_name,
        stored_name=stored_name,
        file_type=file_type,
        file_size=file_size,
        file_path=file_path,
        project_id=project_id,
        extracted_text=extracted_text,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_project_documents(
    db: Session,
    project_id,
):
    return (
        db.query(Document)
        .filter(Document.project_id == project_id)
        .order_by(Document.created_at.desc())
        .all()
    )
def get_document_by_id(
    db: Session,
    document_id,
):
    return (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

def delete_document(
    db: Session,
    document,
):
    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    db.delete(document)
    db.commit()

