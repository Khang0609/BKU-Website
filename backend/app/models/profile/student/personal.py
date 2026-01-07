from datetime import date
from typing import TYPE_CHECKING, Optional, List, Dict, Any

from sqlalchemy import ForeignKey, String, Integer, Date, Enum as SQLAlchemyEnum, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.constants import Gender # Using existing global constant

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.religion import Religion
    from app.models.ethnic import Ethnic

class StudentPersonal(Base):
    __tablename__ = "student_personals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    # Personal Info (Section 1 & 2)
    last_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # Họ và tên lót
    first_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Tên
    avatar_url: Mapped[Optional[str]] = mapped_column(String, nullable=True) # Ảnh đại diện
    
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    gender: Mapped[Optional[Gender]] = mapped_column(SQLAlchemyEnum(Gender), nullable=True)
    
    # ID Card Info
    id_card_number: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    id_card_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    id_card_place: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Contact Info
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    student_email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    personal_email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    backup_email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    # Profile Info (Section 2)
    nationality: Mapped[Optional[str]] = mapped_column(String(50), default="Vietnam", nullable=True)
    place_of_birth: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    other_place_of_birth: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    religion_id: Mapped[Optional[int]] = mapped_column(ForeignKey("religions.id"), nullable=True)
    ethnic_id: Mapped[Optional[int]] = mapped_column(ForeignKey("ethnics.id"), nullable=True)
    
    priority_area: Mapped[Optional[str]] = mapped_column(String(50), default="Khu vực 3", nullable=True)
    priority_object: Mapped[Optional[str]] = mapped_column(String(100), default="Không đối tượng", nullable=True)

    # Dates
    union_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Đoàn
    party_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Đảng
    youth_union_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Hội thanh niên

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_personal")
    religion = relationship("Religion")
    ethnic = relationship("Ethnic")

    # Other
    social_media: Mapped[Optional[Dict[str, str]]] = mapped_column(JSON, nullable=True)
