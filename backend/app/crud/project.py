from uuid import UUID

from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(
    db: Session,
    project: ProjectCreate,
    user_id: UUID,
):
    db_project = Project(
        name=project.name,
        description=project.description,
        user_id=user_id,
    )

    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return db_project


def get_projects(
    db: Session,
    user_id: UUID,
):
    return (
        db.query(Project)
        .filter(Project.user_id == user_id)
        .order_by(Project.created_at.desc())
        .all()
    )


def get_project(
    db: Session,
    project_id: UUID,
    user_id: UUID,
):
    return (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.user_id == user_id,
        )
        .first()
    )


def update_project(
    db: Session,
    db_project: Project,
    project: ProjectUpdate,
):
    if project.name is not None:
        db_project.name = project.name

    if project.description is not None:
        db_project.description = project.description

    db.commit()
    db.refresh(db_project)

    return db_project


def delete_project(
    db: Session,
    db_project: Project,
):
    db.delete(db_project)
    db.commit()