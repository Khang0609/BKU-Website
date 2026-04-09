from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class Scholarship(Base):
    __tablename__ = "scholarships"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    name: Mapped[str] = mapped_column(String, nullable=False) # e.g. "Loại xuất sắc", "Loại giỏi"
    
    # Conditions
    gpa_4_condition: Mapped[float] = mapped_column(Float, nullable=False)
    gpa_10_condition: Mapped[float] = mapped_column(Float, nullable=False)
    training_point_condition: Mapped[int] = mapped_column(Integer, nullable=False)
    
    # Reward (%)
    scholarship_percentage: Mapped[int] = mapped_column(Integer, nullable=False)
