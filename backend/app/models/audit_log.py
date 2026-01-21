from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.models.base import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    
    # "AI LÀM?" -> ID của người thực hiện hành động (link tới Identity.id)
    actor_id = Column(Integer, ForeignKey("identities.id"), index=True, nullable=False)
    
    # "LÀM Ở ĐÂU?" -> Tên bảng bị tác động (ví dụ: 'address', 'general_info')
    target_type = Column(String, index=True, nullable=False)
    
    # "LÀM VỚI AI?" -> ID của bản ghi bị tác động (ví dụ: id của dòng địa chỉ đó)
    target_id = Column(Integer, ForeignKey("identities.id"), index=True, nullable=False)
    
    # "LÀM GÌ?" -> Hành động (CREATE, UPDATE, DELETE)
    action = Column(String, index=True)
    
    # "THAY ĐỔI GÌ?" -> Nội dung C (Lưu dạng JSON cho linh hoạt)
    old_values = Column(JSON, nullable=True) # Giá trị trước khi sửa
    new_values = Column(JSON, nullable=True) # Giá trị sau khi sửa
    
    # "KHI NÀO?" -> Thời điểm B
    created_at = Column(DateTime, server_default=func.now())