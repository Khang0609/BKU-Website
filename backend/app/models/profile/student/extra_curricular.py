from typing import TYPE_CHECKING
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.adminstrative.extra_curricular import ExtraCurricular

class StudentExtraCurricular(Base):
    __tablename__ = "student_extra_curriculars"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False)
    extra_curricular_id: Mapped[str] = mapped_column(ForeignKey("extra_curriculars.id"), nullable=False)
    
    social_work_days_exchange: Mapped[int] = mapped_column(Integer, default=0)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_extra_curriculars")
    extra_curricular: Mapped["ExtraCurricular"] = relationship("ExtraCurricular")
