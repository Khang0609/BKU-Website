from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship as orm_relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.location import Province, Ward

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
    
    # Address Components
    province_id: Mapped[Optional[int]] = mapped_column(ForeignKey("provinces.id"), nullable=True)
    ward_id: Mapped[Optional[int]] = mapped_column(ForeignKey("wards.id"), nullable=True)
    house_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    address: Mapped[Optional[str]] = mapped_column(Text, nullable=True) # Detailed string (Legacy or Full string)
    
    is_emergency_contact: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationship
    identity = orm_relationship("Identity", back_populates="student_guardian")
    province = orm_relationship("Province")
    ward = orm_relationship("Ward")
