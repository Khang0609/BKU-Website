from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import User, UserRole, ProfileUpdateRequest
from app.routes.auth import get_current_active_user
from app.schemas.schemas_request import ProfileUpdateRequestCreate, ProfileUpdateRequestRes, ProfileUpdateRequestHandle
from app.constants import RequestStatus

router = APIRouter()

# --- Student Endpoints ---

@router.post("/requests", response_model=ProfileUpdateRequestRes)
async def create_update_request(
    request_data: ProfileUpdateRequestCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Students can submit a request to update their profile information (e.g., Health Insurance).
    """
    if not current_user.identity:
        raise HTTPException(status_code=400, detail="User has no identity")
    
    # Check if there's already a pending request of the same type to avoid duplicates
    existing_request = db.query(ProfileUpdateRequest).filter(
        ProfileUpdateRequest.identity_id == current_user.identity.id,
        ProfileUpdateRequest.type == request_data.type,
        ProfileUpdateRequest.status == RequestStatus.PENDING
    ).first()
    
    if existing_request:
        raise HTTPException(status_code=400, detail="You already have a pending request of this type")

    new_request = ProfileUpdateRequest(
        identity_id=current_user.identity.id,
        type=request_data.type,
        requested_data=request_data.requested_data,
        proof_url=request_data.proof_url,
        status=RequestStatus.PENDING
    )
    
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request

@router.get("/requests", response_model=List[ProfileUpdateRequestRes])
async def get_my_requests(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Students can view their own history of update requests.
    """
    if not current_user.identity:
        raise HTTPException(status_code=400, detail="User has no identity")
        
    requests = db.query(ProfileUpdateRequest).filter(
        ProfileUpdateRequest.identity_id == current_user.identity.id
    ).order_by(ProfileUpdateRequest.created_at.desc()).all()
    
    return requests

# --- Admin/Office Endpoints ---

@router.get("/admin/requests", response_model=List[ProfileUpdateRequestRes])
async def get_all_requests(
    status: Optional[RequestStatus] = None,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Admins can view all update requests, optionally filtered by status.
    """
    if not current_user.identity or current_user.identity.role not in [UserRole.ADMIN, UserRole.OFFICE]:
        raise HTTPException(status_code=403, detail="Not authorized. Admin or Office role required.")
        
    query = db.query(ProfileUpdateRequest)
    if status:
        query = query.filter(ProfileUpdateRequest.status == status)
        
    return query.order_by(ProfileUpdateRequest.created_at.desc()).all()

@router.post("/admin/requests/{request_id}/handle", response_model=ProfileUpdateRequestRes)
async def handle_update_request(
    request_id: int,
    handle_data: ProfileUpdateRequestHandle,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Admins can approve or reject a profile update request.
    """
    if not current_user.identity or current_user.identity.role not in [UserRole.ADMIN, UserRole.OFFICE]:
        raise HTTPException(status_code=403, detail="Not authorized. Admin or Office role required.")
        
    request = db.query(ProfileUpdateRequest).filter(ProfileUpdateRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
        
    if request.status != RequestStatus.PENDING:
        raise HTTPException(status_code=400, detail="Request already handled")
        
    request.status = handle_data.status
    request.admin_comment = handle_data.admin_comment
    request.handled_by_id = current_user.identity.id
    
    db.commit()
    db.refresh(request)
    return request
