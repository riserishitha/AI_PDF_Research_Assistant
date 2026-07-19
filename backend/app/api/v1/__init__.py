from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.projects import router as project_router
from app.api.v1.document import router as document_router
from app.api.v1.search import router as search_router


api_router = APIRouter()
api_router.include_router(search_router)
api_router.include_router(auth_router)
api_router.include_router(project_router)
api_router.include_router(document_router)
