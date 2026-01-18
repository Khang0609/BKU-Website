from enum import Enum
from typing import TYPE_CHECKING
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.adminstrative.decision import Decision

class StudentDecision(Base):
    __tablename__ = "student_decisions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    decision_id: Mapped[int] = mapped_column(ForeignKey("decisions.id"), nullable=False)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False)
    
    # Extra data
    note: Mapped[str] = mapped_column(String, nullable=True)

    # Relationships
    decision: Mapped["Decision"] = relationship("Decision")
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_decisions")
