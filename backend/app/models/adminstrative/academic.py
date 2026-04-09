from app.models.base import Base
from typing import TYPE_CHECKING, Optional
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Faculty(Base):
    __tablename__ = "faculties"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False) # Ví dụ: Khoa KH&KT Máy tính [cite: 18]
    en_name: Mapped[Optional[str]] = mapped_column(String, unique=True, nullable=True) # Ví dụ: Faculty of Computer Science and Engineering
    standard_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    extended_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    majors: Mapped["Major"] = relationship("Major", back_populates="faculty")

class Major(Base):
    __tablename__ = "majors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False) # Ví dụ: Kỹ thuật Máy tính 
    en_name = Column(String, nullable=True)
    faculty_id = Column(Integer, ForeignKey("faculties.id"))
    
    faculty = relationship("Faculty", back_populates="majors")

class ManagementUnit(Base):
    __tablename__ = "management_units"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    en_name = Column(String, nullable=True)
    address = Column(String, nullable=True)
    phone_number = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    website = Column(String(100), nullable=True)

class AcademicBatch(Base):
    __tablename__ = "academics_batch"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    batch_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False) # Ví dụ: K2022, K2023
    admission_year: Mapped[int] = mapped_column(Integer, nullable=False) # Năm nhập học thực tế