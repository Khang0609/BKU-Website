from enum import Enum
from typing import TYPE_CHECKING
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.profile.student.anchor import StudentRoleAnchor
    from app.models.adminstrative.decision import Decision

class StudentDecision(Base):
    __tablename__ = "student_decisions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    decision_id: Mapped[int] = mapped_column(ForeignKey("decisions.id"), nullable=False)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), nullable=False)
    
    # Extra data
    note: Mapped[str] = mapped_column(String, nullable=True)

    # Relationships
    decision: Mapped["Decision"] = relationship("Decision")
    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor", back_populates="student_decisions")
