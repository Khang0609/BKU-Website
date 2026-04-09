from typing import TYPE_CHECKING, Optional
from sqlalchemy import ForeignKey, String, Integer, Enum as SQLAlchemyEnum, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from app.models.base import Base
from app.constants import RequestStatus, RequestType

if TYPE_CHECKING:
    from app.models.auth import Identity

class ProfileUpdateRequest(Base):
    __tablename__ = "profile_update_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    identity_id: Mapped[int] = mapped_column(ForeignKey("identities.id"), nullable=False, index=True)
    
    type: Mapped[RequestType] = mapped_column(SQLAlchemyEnum(RequestType), nullable=False, index=True)
    status: Mapped[RequestStatus] = mapped_column(SQLAlchemyEnum(RequestStatus), default=RequestStatus.PENDING, index=True)
    
    # The new data to be updated, stored as JSON
    requested_data: Mapped[dict] = mapped_column(JSON, nullable=False)
    
    # Path to evidence/proof image
    proof_url: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    # Admin feedback
    admin_comment: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    handled_by_id: Mapped[Optional[int]] = mapped_column(ForeignKey("identities.id"), nullable=True)
    
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    identity: Mapped["Identity"] = relationship("Identity", foreign_keys=[identity_id], back_populates="profile_requests")
    handled_by: Mapped[Optional["Identity"]] = relationship("Identity", foreign_keys=[handled_by_id])
