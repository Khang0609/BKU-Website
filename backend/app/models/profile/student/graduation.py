from datetime import date
from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class StudentGraduation(Base):
    """Lưu trữ thông tin quyết định tốt nghiệp"""
    __tablename__ = "student_graduations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), unique=True, nullable=False)
    
    grad_major: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    grad_year_semester: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    grad_decision_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    grad_decision_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_graduation")
