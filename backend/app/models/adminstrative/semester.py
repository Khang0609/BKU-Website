from enum import Enum
from datetime import date
from sqlalchemy import Column, Integer, String, Date, Boolean, Enum as SQLAlchemyEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class SemesterTerm(str, Enum):
    HK1 = "HK1"
    HK2 = "HK2"
    SUMMER = "SUMMER"

class Semester(Base):
    __tablename__ = "semesters"

    id: Mapped[str] = mapped_column(String, primary_key=True) # Ví dụ: K252
    academic_year: Mapped[str] = mapped_column(String, nullable=False) # Ví dụ: 2024-2025
    term: Mapped[SemesterTerm] = mapped_column(SQLAlchemyEnum(SemesterTerm), nullable=False)
    
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    end_date: Mapped[date] = mapped_column(Date, nullable=False)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
