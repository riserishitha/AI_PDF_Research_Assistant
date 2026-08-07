from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.api.v1 import api_router
from app.api.v1.search import router as search_router
from app.api.v1.chat import router as chat_router
from app.database.database import engine


app = FastAPI(
    title="AI Research Workspace API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

origins = [
    "http://localhost:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PDF STORAGE
# ============================================================

# main.py is located inside:
# backend/app/main.py
#
# Therefore:
# BASE_DIR = backend/app

BASE_DIR = Path(__file__).resolve().parent

PDF_DIR = BASE_DIR / "uploads" / "pdfs"


# Make sure the directory exists
PDF_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


# Expose PDFs through the API
#
# Example:
# Stored file:
# app/uploads/pdfs/example.pdf
#
# Browser URL:
# http://127.0.0.1:8000/uploads/pdfs/example.pdf

app.mount(
    "/uploads/pdfs",
    StaticFiles(directory=str(PDF_DIR)),
    name="pdfs",
)


# ============================================================
# API ROUTES
# ============================================================

app.include_router(
    api_router,
    prefix="/api/v1",
)


app.include_router(
    search_router,
    prefix="/api/v1",
)


app.include_router(
    chat_router,
    prefix="/api/v1",
)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "AI Research Workspace Backend is Running 🚀"
    }


# ============================================================
# DATABASE HEALTH CHECK
# ============================================================

@app.get("/health/db")
def database_health():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "Database Connected ✅"
    }