from sqlalchemy.orm import Session

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