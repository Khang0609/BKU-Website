import enum
from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Enum as SQLAlchemyEnum, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.location import Province, Ward, District # Assuming District exists

class AddressType(str, enum.Enum):
    PERMANENT = "PERMANENT" # Thông tin thường trú
    CURRENT = "CURRENT"     # Nơi ở hiện tại (thường trú hoặc tạm trú)
    HOMETOWN = "HOMETOWN"   # Quê quán (Optional)

class StudentAddress(Base):
    __tablename__ = "student_addresses"
    __table_args__ = (
        UniqueConstraint('identity_id', 'address_type', name='_student_address_type_uc'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False)
    
    address_type: Mapped[AddressType] = mapped_column(SQLAlchemyEnum(AddressType), nullable=False)

    # Location Foreign Keys
    province_id: Mapped[Optional[int]] = mapped_column(ForeignKey("provinces.id"), nullable=True)
    ward_id: Mapped[Optional[int]] = mapped_column(ForeignKey("wards.id"), nullable=True)

    # Address Details
    street: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    house_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_addresses")
    
    # Location relationships
    province: Mapped["Province"] = relationship("Province")
    ward: Mapped["Ward"] = relationship("Ward")
    # District relationship would go here similarly
