from datetime import date
from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class StudentParent(Base):
    __tablename__ = "student_parents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    # Father Info
    father_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    father_birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    father_phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    father_job: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    father_workplace: Mapped[Optional[str]] = mapped_column(String(255), nullable=True) # "Nơi công tác"

    # Mother Info
    mother_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    mother_birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    mother_phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    mother_job: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    mother_workplace: Mapped[Optional[str]] = mapped_column(String(255), nullable=True) # "Nơi công tác"

    # Relationship
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_parent")
