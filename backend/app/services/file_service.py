import os
import uuid

from fastapi import UploadFile
from pypdf import PdfReader

UPLOAD_DIRECTORY = "app/uploads/pdfs"


def save_pdf(file: UploadFile):
    """
    Save uploaded PDF and return metadata.
    """

    os.makedirs(
        UPLOAD_DIRECTORY,
        exist_ok=True,
    )

    extension = os.path.splitext(file.filename)[1]

    unique_filename = (
        f"{uuid.uuid4()}{extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        unique_filename,
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return {
        "original_name": file.filename,
        "stored_name": unique_filename,
        "file_path": file_path,
        "file_size": os.path.getsize(file_path),
        "file_type": extension,
    }


def extract_text_from_pdf(file_path: str):
    """
    Extract all text from a PDF.
    """

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text