from app.models.base import Base
from sqlalchemy import Column, Integer, String, Enum, Boolean, Date, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.constants import Gender, UserRole, Status

class Identity(Base):
    __tablename__ = "identities"

    # Changed from internal_id (String) to id (Integer, auto-increment) as requested
    id = Column(Integer, primary_key=True, index=True)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)

    # Updated fields
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="identity", uselist=False)
    general_information = relationship("GeneralInformation", back_populates="identity", uselist=False)

    # Relationships linked to Student
    addresses = relationship("Address", back_populates="identity")

    # New Role-specific Anchor (Hub for Student Role data)
    student_anchor = relationship("StudentRoleAnchor", back_populates="identity", uselist=False, lazy="joined")

    # Shared profile data
    health_insurance = relationship("HealthInsurance", back_populates="identity", uselist=False)
    
    # Profile update requests
    profile_requests = relationship("ProfileUpdateRequest", back_populates="identity", foreign_keys="[ProfileUpdateRequest.identity_id]")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # Changed FK to Integer to match Identity.id
    identity_id = Column(Integer, ForeignKey("identities.id"), unique=True)
    
    identity = relationship("Identity", back_populates="user")