from uuid import UUID
from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import HTTPException
from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.services.chunk_service import split_text
from app.crud.document_chunk import create_document_chunks
from app.core.dependencies import get_current_user
from app.crud.document import create_document
from app.crud.project import get_project
from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.file_service import extract_text_from_pdf
from app.services.file_service import save_pdf

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "/upload/{project_id}",
    response_model=DocumentResponse,
)
def upload_document(
    project_id: UUID,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = get_project(
        db,
        project_id,
        current_user.id,
)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    if project.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized",
    )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed",
        )

    saved_file = save_pdf(file)

    extracted_text = extract_text_from_pdf(
        saved_file["file_path"]
    )

    print("\n")
    print("=" * 60)
    print("PDF CONTENT")
    print("=" * 60)
    print(extracted_text[:1000])
    print("=" * 60)

    document = create_document(
    db=db,
    original_name=saved_file["original_name"],
    stored_name=saved_file["stored_name"],
    file_type=saved_file["file_type"],
    file_size=saved_file["file_size"],
    file_path=saved_file["file_path"],
    project_id=project.id,
    extracted_text=extracted_text,
    )

    chunks = split_text(extracted_text)

    create_document_chunks(
        db=db,
        document_id=document.id,
        chunks=chunks,
    )

    print(f"Created {len(chunks)} chunks")

    return document