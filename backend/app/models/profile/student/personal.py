from datetime import date
from typing import TYPE_CHECKING, Optional, List, Dict, Any

from sqlalchemy import ForeignKey, String, Integer, Date, Enum as SQLAlchemyEnum, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.constants import Gender, PriorityGroup, PriorityArea # Using existing global constant

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.religion import Religion
    from app.models.ethnic import Ethnic

class StudentPersonal(Base):
    __tablename__ = "student_personals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    # Contact Info

    dorm_room: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    family_phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True) # Added to support Section 3

    # Profile Info (Section 2)

    
    priority_area: Mapped[Optional[PriorityArea]] = mapped_column(SQLAlchemyEnum(PriorityArea), default=PriorityArea.KV3, nullable=True)
    priority_group: Mapped[Optional[PriorityGroup]] = mapped_column(SQLAlchemyEnum(PriorityGroup), default=PriorityGroup.NONE, nullable=True)

    # Dates
    union_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Đoàn
    party_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Đảng
    youth_union_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Ngày vào Hội thanh niên

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_personal")


    # Other
    social_media: Mapped[Optional[Dict[str, str]]] = mapped_column(JSON, nullable=True)
