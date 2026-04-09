from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

if TYPE_CHECKING:
    from app.models.profile.student.anchor import StudentRoleAnchor

class StudentFinance(Base):
    """Lưu trữ thông tin tài khoản ngân hàng và định danh tài chính"""
    __tablename__ = "student_finances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    anchor_id: Mapped[int] = mapped_column(ForeignKey("student_role_anchors.identity_id"), unique=True, nullable=False)
    
    bknet_account: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    bank_account: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    bank_name: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ocb_cif: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    anchor: Mapped["StudentRoleAnchor"] = relationship("StudentRoleAnchor", back_populates="student_finance")

