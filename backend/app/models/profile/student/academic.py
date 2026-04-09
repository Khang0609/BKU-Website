from datetime import date
from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Date, Enum as SQLAlchemyEnum, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.adminstrative.academic import ManagementUnit  # Assuming this exists or using String if not sure, but text said 'ManageUnit'

# Circular import handling
if TYPE_CHECKING:
    from app.models.profile.student.anchor import StudentRoleAnchor

class StudentAcademic(Base):
    __tablename__ = "student_academics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), unique=True, nullable=False)

    # Student Info
    class_code: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    
    # Other
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor", back_populates="student_academic")



