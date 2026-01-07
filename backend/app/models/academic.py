from app.models.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Faculty(Base):
    __tablename__ = "faculties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False) # Ví dụ: Khoa KH&KT Máy tính [cite: 18]
    en_name = Column(String, unique=True, nullable=True) # Ví dụ: Faculty of Computer Science and Engineering
    majors = relationship("Major", back_populates="faculty")

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
    management_unit_id = Column(Integer, ForeignKey("management_units.id"))