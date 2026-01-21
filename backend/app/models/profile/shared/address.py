from typing import Optional, TYPE_CHECKING
import enum
from sqlalchemy import Integer, String, ForeignKey, Enum as SQLAlchemyEnum, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.location import Province, Ward

class AddressType(str, enum.Enum):
    PERMANENT = "PERMANENT"
    CURRENT = "CURRENT"
    HOMETOWN = "HOMETOWN"
    GUARDIAN = "GUARDIAN"

class Address(Base):
    __tablename__ = "addresses"
    __table_args__ = (
        UniqueConstraint('identity_id', 'address_type', name='_identity_address_type_uc'),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False)
    
    address_type: Mapped[AddressType] = mapped_column(SQLAlchemyEnum(AddressType), nullable=False)

    # Location Foreign Keys
    province_id: Mapped[Optional[int]] = mapped_column(ForeignKey("provinces.id"), nullable=True)
    ward_id: Mapped[Optional[int]] = mapped_column(ForeignKey("wards.id"), nullable=True)

    # Details
    detail: Mapped[Optional[str]] = mapped_column(String(200), nullable=True) # street + house_number merged or separate? User asked for 'detail' (street and address number)
    
    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="addresses")
    
    # Location relationships
    province: Mapped["Province"] = relationship("app.models.location.Province")
    ward: Mapped["Ward"] = relationship("app.models.location.Ward")
