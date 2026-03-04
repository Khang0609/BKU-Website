from enum import Enum
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base

class ExtraCurricularState(str, Enum):
    END = "END"
    PREPARED = "PREPARED"

class ExtraCurricular(Base):
    __tablename__ = "extra_curriculars"

    id: Mapped[str] = mapped_column(String, primary_key=True, index=True) # Curricular ID from field.md
    name: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    day_start: Mapped[str] = mapped_column(String, nullable=False)
    duration_days: Mapped[int] = mapped_column(Integer, nullable=False) # Number of day to execute
    has_proof: Mapped[bool] = mapped_column(Boolean, default=False)
    state: Mapped[ExtraCurricularState] = mapped_column(SQLAlchemyEnum(ExtraCurricularState), nullable=False)
