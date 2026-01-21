from typing import Optional, TYPE_CHECKING
from datetime import date
from sqlalchemy import String, Integer, Date, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.constants import Gender, Status

if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.religion import Religion
    from app.models.ethnic import Ethnic
    from app.models.location import Country

class GeneralInformation(Base):
    __tablename__ = "general_informations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    # From Personal & Identity
    last_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) 
    first_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)    
    
    avatar_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    date_of_birth: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    gender: Mapped[Optional[Gender]] = mapped_column(SQLAlchemyEnum(Gender), nullable=True)
    
    # ID Card Info
    id_card_number: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    id_card_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    id_card_place: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Contact
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    personal_email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    backup_email: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Places & Origin
    nationality_id: Mapped[Optional[int]] = mapped_column(ForeignKey("countries.id"), nullable=True)
    place_of_birth: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    other_place_of_birth: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Relationships
    religion_id: Mapped[Optional[int]] = mapped_column(ForeignKey("religions.id"), nullable=True)
    ethnic_id: Mapped[Optional[int]] = mapped_column(ForeignKey("ethnics.id"), nullable=True)
    
    status: Mapped[Optional[Status]] = mapped_column(SQLAlchemyEnum(Status), default=Status.ACTIVE)

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="general_information")
    religion: Mapped["Religion"] = relationship("Religion")
    ethnic: Mapped["Ethnic"] = relationship("Ethnic")
    country: Mapped["Country"] = relationship("Country")

