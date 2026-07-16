from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.api.v1.auth import router as auth_router
from app.api.v1.projects import router as project_router
from app.database.database import engine
from app.api.v1.documents import router as document_router

app = FastAPI(
    title="AI Research Workspace API",
    version="1.0.0",
)
app.include_router(auth_router, prefix="/api/v1")
origins = [
    "http://localhost:5173",
]

app.include_router(
    document_router,
    prefix="/api/v1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "AI Research Workspace Backend is Running 🚀"
    }


@app.get("/health/db")
def database_health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "Database Connected ✅"
    }