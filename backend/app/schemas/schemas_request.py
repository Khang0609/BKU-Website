from typing import Optional, Any, Dict, List
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.constants import RequestStatus, RequestType

class ProfileUpdateRequestCreate(BaseModel):
    type: RequestType
    requested_data: Dict[str, Any]
    proof_url: Optional[str] = None

class ProfileUpdateRequestRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    identity_id: int
    type: RequestType
    status: RequestStatus
    requested_data: Dict[str, Any]
    proof_url: Optional[str]
    admin_comment: Optional[str]
    handled_by_id: Optional[int]
    created_at: datetime
    updated_at: datetime

class ProfileUpdateRequestHandle(BaseModel):
    status: RequestStatus # Should be APPROVED or REJECTED
    admin_comment: Optional[str] = None
