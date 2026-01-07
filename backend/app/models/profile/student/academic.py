from datetime import date
from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey, String, Integer, Date, Enum as SQLAlchemyEnum, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.academic import ManagementUnit  # Assuming this exists or using String if not sure, but text said 'ManageUnit'

# Circular import handling
if TYPE_CHECKING:
    from app.models.auth import Identity
    from app.models.training import Major  # Assuming
    from app.models.academic import ManagementUnit

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
    
    # Training Details
    enrollment_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    curriculum_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True) # Năm CTĐT
    
    # New fields as requested
    entry_semester: Mapped[Optional[str]] = mapped_column(String(20), nullable=True) # HK bắt đầu (e.g., "HK1 2020-2021")
    study_duration_standard: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Đào tạo đến HK chuẩn (e.g., "HK2 2024-2025")
    
    # Semester Info
    extended_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    reduced_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    standard_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True) # Số HK đào tạo (chuẩn)
    max_semesters: Mapped[Optional[int]] = mapped_column(Integer, nullable=True) # Số HK đào tạo (tối đa)

    # Graduation Timing
    expected_graduation_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Thời điểm tốt nghiệp (chuẩn)
    max_graduation_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True) # Thời điểm tốt nghiệp (tối đa)

    # Training Specifics
    education_level: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # Bậc đào tạo
    training_system: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # Hệ đào tạo
    training_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True) # Loại hình đào tạo
    program: Mapped[Optional[str]] = mapped_column(String(200), nullable=True) # Chương trình
    campus: Mapped[Optional[str]] = mapped_column(String(200), nullable=True) # Đào tạo ở Cơ sở
    local_training: Mapped[Optional[str]] = mapped_column(String(200), nullable=True) # Đào tạo ở Địa phương
    training_session: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Buổi đào tạo
    student_status: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Tình trạng sinh viên

    # Graduation Info
    grad_major: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    grad_year_semester: Mapped[Optional[str]] = mapped_column(String(50), nullable=True) # Năm học, học kỳ
    grad_decision_number: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    grad_decision_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    # Account Info
    bknet_account: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    bank_account: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    bank_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ocb_cif: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    # Other
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", back_populates="student_academic")
    
    # Assuming standard model names for 'Major' and 'ManagementUnit'
    major: Mapped["Major"] = relationship("Major") 
    management_unit: Mapped["ManagementUnit"] = relationship("ManagementUnit")
