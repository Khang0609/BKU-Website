from enum import Enum
from typing import TYPE_CHECKING
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.models.base import Base

class DecisionType(str, Enum):
    IN = "in"
    OTHER = "other"

class Decision(Base):
    __tablename__ = "decisions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    semester: Mapped[str] = mapped_column(String, nullable=False)
    decision_reason: Mapped[str] = mapped_column(String, nullable=False)
    decision_number: Mapped[str] = mapped_column(String, nullable=False)
    decision_content: Mapped[str] = mapped_column(String, nullable=False)
    signed_date: Mapped[str] = mapped_column(String, nullable=False)
    last_updated: Mapped[str] = mapped_column(String, nullable=False)
    decision_type: Mapped[DecisionType] = mapped_column(SQLAlchemyEnum(DecisionType), nullable=False)
