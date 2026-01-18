from app.models.base import Base
from sqlalchemy import Column, Integer, String, Enum, Boolean, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.constants import Gender, UserRole, Status

class Identity(Base):
    __tablename__ = "identities"

    # Changed from internal_id (String) to id (Integer, auto-increment) as requested
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(Enum(Gender), nullable=True)

    # Identity Info
    identity_card = Column(String, nullable=True)
    date_created = Column(Date, nullable=True)
    place_created = Column(String, nullable=True)

    # Others
    place_of_birth = Column(String, nullable=True)
    nationality = Column(String, nullable=True)
    status = Column(Enum(Status), default=Status.ACTIVE)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Quan hệ ngược lại với User
    user = relationship("User", back_populates="identity", uselist=False)
    student_academic = relationship("StudentAcademic", back_populates="identity", uselist=False)
    student_personal = relationship("StudentPersonal", back_populates="identity", uselist=False)
    student_addresses = relationship("StudentAddress", back_populates="identity")
    
    student_parent = relationship("StudentParent", back_populates="identity", uselist=False)
    student_guardian = relationship("StudentGuardian", back_populates="identity", uselist=False)
    student_decisions = relationship("StudentDecision", back_populates="identity")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)
    is_active = Column(Boolean, default=True)

    # Changed FK to Integer to match Identity.id
    identity_id = Column(Integer, ForeignKey("identities.id"), unique=True)
    
    identity = relationship("Identity", back_populates="user")