from sqlalchemy.orm import Session

from app.models.chat import Chat


def create_chat(
    db: Session,
    project_id,
    question: str,
    answer: str,
):
    chat = Chat(
        project_id=project_id,
        question=question,
        answer=answer,
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_project_chats(
    db: Session,
    project_id,
):
    return (
        db.query(Chat)
        .filter(Chat.project_id == project_id)
        .order_by(Chat.created_at.asc())
        .all()
    )