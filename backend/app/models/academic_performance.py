from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, List, Optional
from sqlalchemy import ForeignKey, String, Integer, Float, Boolean, Enum as SQLAlchemyEnum, Index, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.adminstrative.course import Course
    from app.models.adminstrative.semester import Semester
    from app.models.profile.student.anchor import StudentRoleAnchor
    from app.models.adminstrative.scholarship import Scholarship

class ScholarshipStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"

class CourseComponent(Base):
    """
    Define grading structure (e.g., Midterm 20%, Final 50%).
    """
    __tablename__ = "course_components"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False)
    component_name: Mapped[str] = mapped_column(String(100), nullable=False)
    weight: Mapped[float] = mapped_column(Float, nullable=False)  # e.g., 0.2 for 20%
    is_bonus: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationships
    course: Mapped["Course"] = relationship("Course")
    grades: Mapped[List["StudentComponentGrade"]] = relationship("StudentComponentGrade", back_populates="component")

class Enrollment(Base):
    """
    Link students to courses per semester.
    """
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), nullable=False, index=True)
    course_id: Mapped[str] = mapped_column(ForeignKey("courses.id"), nullable=False, index=True)
    semester_id: Mapped[str] = mapped_column(ForeignKey("semesters.id"), nullable=False, index=True)

    # Relationships
    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor")
    course: Mapped["Course"] = relationship("Course")
    semester: Mapped["Semester"] = relationship("Semester")
    
    component_grades: Mapped[List["StudentComponentGrade"]] = relationship("StudentComponentGrade", back_populates="enrollment")
    semester_result: Mapped["SemesterResult"] = relationship("SemesterResult", back_populates="enrollment", uselist=False)

class StudentComponentGrade(Base):
    """
    Store raw scores for each component.
    """
    __tablename__ = "student_component_grades"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    enrollment_id: Mapped[int] = mapped_column(ForeignKey("enrollments.id"), nullable=False, index=True)
    component_id: Mapped[int] = mapped_column(ForeignKey("course_components.id"), nullable=False)
    raw_grade: Mapped[float] = mapped_column(Float, nullable=False)

    # Relationships
    enrollment: Mapped["Enrollment"] = relationship("Enrollment", back_populates="component_grades")
    component: Mapped["CourseComponent"] = relationship("CourseComponent", back_populates="grades")

class SemesterResult(Base):
    """
    Physical cache for final results to prevent calculation lag.
    """
    __tablename__ = "semester_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    enrollment_id: Mapped[int] = mapped_column(ForeignKey("enrollments.id"), unique=True, nullable=False)
    
    # Calculated values (cached)
    # SUM(raw_grade * weight), capped at 10.0
    final_grade_10: Mapped[float] = mapped_column(Float, nullable=False)
    final_grade_4: Mapped[float] = mapped_column(Float, nullable=False)
    is_passed: Mapped[bool] = mapped_column(Boolean, nullable=False)

    # Relationships
    enrollment: Mapped["Enrollment"] = relationship("Enrollment", back_populates="semester_result")

class ScholarshipRecipient(Base):
    """
    Final list of students who earned scholarships for a specific term.
    """
    __tablename__ = "scholarship_recipients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), nullable=False, index=True)
    scholarship_id: Mapped[int] = mapped_column(ForeignKey("scholarships.id"), nullable=False)
    semester_id: Mapped[str] = mapped_column(ForeignKey("semesters.id"), nullable=False, index=True)
    status: Mapped[ScholarshipStatus] = mapped_column(SQLAlchemyEnum(ScholarshipStatus), default=ScholarshipStatus.PENDING, nullable=False)

    # Snapshots for history
    gpa_4: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    gpa_10: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    cpa_4: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    cpa_10: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    credits_earned: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    cumulative_credits: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    training_point: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    amount: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    result: Mapped[Optional[str]] = mapped_column(String, nullable=True) # e.g., "Đạt", "Không đạt"

    # Metadata
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    created_by: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
    updated_by: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    # Relationships
    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor")
    scholarship: Mapped["Scholarship"] = relationship("Scholarship")
    semester: Mapped["Semester"] = relationship("Semester")
