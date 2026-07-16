from app.services.file_service import extract_text_from_pdf

text = extract_text_from_pdf(
    "app/uploads/pdfs/Nallapureddy_Rishitha_Data_Science.pdf"
)

print(text)