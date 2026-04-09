from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.auth import Identity

class HealthInsurance(Base):
    __tablename__ = "health_insurances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True, index=True)

    medical_book_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Số sổ y tế (sổ khám bệnh của trường)
    health_insurance_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Số thẻ BH y tế
    accident_insurance_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Số thẻ BH tai nạn

    # Relationship
    identity: Mapped["Identity"] = relationship("Identity", back_populates="health_insurance")
