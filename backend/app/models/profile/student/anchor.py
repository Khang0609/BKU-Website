from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.adminstrative.academic import Major, ManagementUnit, AcademicBatch
    from app.models.profile.student.program import StudentProgram
    from app.models.profile.student.timeline import StudentTimeline
    from app.models.profile.student.graduation import StudentGraduation
    from app.models.profile.student.personal import StudentPersonal
    from app.models.profile.student.academic import StudentAcademic
    from app.models.profile.student.finance import StudentFinance
    from app.models.profile.student.parent import StudentParent
    from app.models.profile.student.guardian import StudentGuardian
    from app.models.profile.student.decision import StudentDecision
    from app.models.profile.student.extra_curricular import StudentExtraCurricular

class StudentRoleAnchor(Base):
    """
    Bảng bước đệm cho Role Sinh viên (Identity Hub).
    Đóng vai trò là Navigation Hub và Life Cycle Management.
    """
    __tablename__ = "student_role_anchors"

    # Định danh: Shared Primary Key với Identity
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), primary_key=True, unique=True, nullable=False)
    
    # Role-specific Only: MSSV
    student_code: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False)
    
    # Life cycle management: Trạng thái sinh viên
    student_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Ví dụ: Đang học, Bảo lưu, Tốt nghiệp
    
    # Performance Tuning & Navigation: Khóa ngoại tới Batch, Major, Unit
    batch_id: Mapped[Optional[int]] = mapped_column(ForeignKey("academics_batch.id"), nullable=True)
    major_id: Mapped[Optional[int]] = mapped_column(ForeignKey("majors.id"), nullable=True)
    unit_id: Mapped[Optional[int]] = mapped_column(ForeignKey("management_units.id"), nullable=True)

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_anchor")
    
    batch: Mapped[Optional["AcademicBatch"]] = relationship("AcademicBatch")
    major: Mapped[Optional["Major"]] = relationship("Major")
    management_unit: Mapped[Optional["ManagementUnit"]] = relationship("ManagementUnit")

    # Modular Relationships (linked to Anchor instead of Identity)
    student_program: Mapped[Optional["StudentProgram"]] = relationship("StudentProgram", back_populates="anchor", uselist=False)
    student_timeline: Mapped[Optional["StudentTimeline"]] = relationship("StudentTimeline", back_populates="anchor", uselist=False)
    student_graduation: Mapped[Optional["StudentGraduation"]] = relationship("StudentGraduation", back_populates="anchor", uselist=False)
    
    student_personal: Mapped[Optional["StudentPersonal"]] = relationship("StudentPersonal", back_populates="anchor", uselist=False)
    student_academic: Mapped[Optional["StudentAcademic"]] = relationship("StudentAcademic", back_populates="anchor", uselist=False)
    student_finance: Mapped[Optional["StudentFinance"]] = relationship("StudentFinance", back_populates="anchor", uselist=False)
    student_parent: Mapped[Optional["StudentParent"]] = relationship("StudentParent", back_populates="anchor", uselist=False)
    student_guardian: Mapped[Optional["StudentGuardian"]] = relationship("StudentGuardian", back_populates="anchor", uselist=False)
    
    student_decisions: Mapped[List["StudentDecision"]] = relationship("StudentDecision", back_populates="anchor")
    student_training_points: Mapped[List["StudentTrainingPoint"]] = relationship("StudentTrainingPoint", back_populates="anchor")
    student_extra_curriculars: Mapped[List["StudentExtraCurricular"]] = relationship("StudentExtraCurricular", back_populates="anchor")
