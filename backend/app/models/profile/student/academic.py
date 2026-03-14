from datetime import date
from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Date, Enum as SQLAlchemyEnum, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.adminstrative.academic import ManagementUnit  # Assuming this exists or using String if not sure, but text said 'ManageUnit'

# Circular import handling
if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.adminstrative.academic import Major  # Assuming
    from app.models.adminstrative.academic import ManagementUnit
    from app.models.profile.student.program import StudentProgram
    from app.models.profile.student.timeline import StudentTimeline
    from app.models.profile.student.finance import StudentFinance
    from app.models.profile.student.graduation import StudentGraduation

class StudentAcademic(Base):
    __tablename__ = "student_academics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, unique=True)

    # Student Info
    student_code: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False)
    class_code: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)

    # Academic Info
    # Link major_id to Majors, and unit_id to ManagementUnits
    major_id: Mapped[Optional[int]] = mapped_column(ForeignKey("majors.id"), nullable=True)
    unit_id: Mapped[Optional[int]] = mapped_column(ForeignKey("management_units.id"), nullable=True)
    
    # Other
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_academic")
    
    # Relationships to sub-tables (Modular structure)
    # program_info, timeline_info, graduation_info moved to Identity
    
    # Assuming standard model names for 'Major' and 'ManagementUnit'
    major: Mapped["Major"] = relationship("Major") 
    management_unit: Mapped["ManagementUnit"] = relationship("ManagementUnit")



