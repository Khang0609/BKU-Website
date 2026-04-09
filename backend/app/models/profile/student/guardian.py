from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship as orm_relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.profile.student.anchor import StudentRoleAnchor

class StudentGuardian(Base):
    __tablename__ = "student_guardians"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), nullable=False, unique=True)

    full_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    relationship_to_student: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # e.g., Uncle, Aunt
    
    phone_number: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    job: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    
    citizen_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    
    is_emergency_contact: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationship
    anchor = orm_relationship("StudentRoleAnchor", back_populates="student_guardian")

