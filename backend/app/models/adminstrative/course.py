from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING, Optional
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.adminstrative.academic import Faculty

class Course(Base):
    __tablename__ = "courses"

    id: Mapped[str] = mapped_column(String, primary_key=True) # Mã môn học (vd: CO1027)
    name: Mapped[str] = mapped_column(String, nullable=False) # Tên môn học
    credits: Mapped[int] = mapped_column(Integer, nullable=False) # Số tín chỉ
    
    faculty_id: Mapped[Optional[int]] = mapped_column(ForeignKey("faculties.id"), nullable=True)

    # Relationships
    faculty: Mapped[Optional["Faculty"]] = relationship("Faculty")
