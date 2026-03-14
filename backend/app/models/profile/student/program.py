from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class StudentProgram(Base):
    """Lưu trữ thông tin về hệ, bậc và hình thức đào tạo"""
    __tablename__ = "student_programs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), unique=True, nullable=False)
    
    education_level: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    training_system: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    training_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    program: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    campus: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    local_training: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    training_session: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    student_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_program")
