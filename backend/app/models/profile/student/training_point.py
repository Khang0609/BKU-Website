from typing import TYPE_CHECKING
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.profile.student.anchor import StudentRoleAnchor

class StudentTrainingPoint(Base):
    __tablename__ = "student_training_points"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), nullable=False)
    
    semester: Mapped[str] = mapped_column(String, nullable=False)
    points: Mapped[int] = mapped_column(Integer, nullable=False)
    rating: Mapped[str] = mapped_column(String, nullable=False)
    updated_at: Mapped[str] = mapped_column(String, nullable=False) # Following the pattern of decision.py where dates are strings

    # Relationships
    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor", back_populates="student_training_points")
