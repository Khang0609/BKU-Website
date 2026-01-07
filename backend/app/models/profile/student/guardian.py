from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class StudentGuardian(Base):
    __tablename__ = "student_guardians"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    full_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    relationship_to_student: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # e.g., Uncle, Aunt
    
    phone_number: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    job: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    
    citizen_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True, nullable=True)
    address: Mapped[Optional[str]] = mapped_column(Text, nullable=True) # Detailed string
    
    is_emergency_contact: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationship
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_guardian")
