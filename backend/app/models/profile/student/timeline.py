from datetime import date
from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class StudentTimeline(Base):
    """Lưu trữ các mốc thời gian và thời hạn đào tạo"""
    __tablename__ = "student_timelines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), unique=True, nullable=False)
    
    enrollment_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    curriculum_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    entry_semester: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    study_duration_standard: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    reduced_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    max_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    expected_graduation_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    max_graduation_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_timeline")
