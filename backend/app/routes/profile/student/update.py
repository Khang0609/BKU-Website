from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.routes.auth import get_current_active_user
from app.models.profile.student import (
     StudentPersonal, StudentParent, 
     StudentGuardian
)

from app.models.profile.shared.address import Address, AddressType
from app.schemas.schemas_student import PersonalUpdate, ContactUpdate, FamilyUpdate, ExtraUpdate

# New Micro CPU & Dispatcher
from app.service.ochestrators.crud.updaters import generic_patch
from app.service.ochestrators.core import dispatch_by_prefix

# Debug
from fastapi import Request
from app.utils.debug import warn_schema_mismatch


router = APIRouter()

@router.patch("/personal")
async def update_personal(request: Request, data: PersonalUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    warn_schema_mismatch(await request.json(), PersonalUpdate, "PersonalUpdate")
    
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    update_data = data.model_dump(exclude_unset=True)

    # Micro CPU: 2 Calls to handle everything (Fetch/Create -> Merge -> Commit)
    # generic_patch(db, GeneralInformation, {"identity_id": identity.id}, update_data)
    generic_patch(db, StudentPersonal, {"identity_id": identity.id}, update_data)
        
    return {"success": True}

@router.patch("/family")
async def update_family(request: Request, data: FamilyUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    warn_schema_mismatch(await request.json(), FamilyUpdate, "FamilyUpdate")
    
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    update_data = data.model_dump(exclude_unset=True)
    
    # 1. Update Parents (Direct keys)
    generic_patch(db, StudentParent, {"identity_id": identity.id}, update_data)
    
    # 2. Update Guardian & Guardian Address
    # Dispatch extracts "guardian_*" keys (e.g., "guardian_full_name" -> "full_name")
    # generic_patch is smart enough to ignore fields not in the model (e.g., Address ignores "full_name", Guardian ignores "province_id")
    guardian_payload = dispatch_by_prefix(update_data, "guardian")
    
    if guardian_payload:
        generic_patch(db, StudentGuardian, {"identity_id": identity.id}, guardian_payload)
        generic_patch(db, Address, {"identity_id": identity.id, "address_type": AddressType.GUARDIAN}, guardian_payload)

    return {"success": True}

@router.patch("/contact")
async def update_contact(request: Request, data: ContactUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    warn_schema_mismatch(await request.json(), ContactUpdate, "ContactUpdate")
    
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    update_data = data.model_dump(exclude_unset=True)
    print("Received update data:", update_data)
    
    # 1. Direct Fields
    # generic_patch(db, GeneralInformation, {"identity_id": identity.id}, update_data)
    generic_patch(db, StudentPersonal, {"identity_id": identity.id}, update_data)

    # 2. Address Handling - Moved to Shared/General Update
    # Map prefix -> AddressType
    addr_map = {
        "current": AddressType.CURRENT,
        "permanent": AddressType.PERMANENT,
    }
    
    for prefix, addr_type in addr_map.items():
        payload = dispatch_by_prefix(update_data, prefix)
        print("Payload data:", payload)
        if payload:  
            generic_patch(db, Address, {"identity_id": identity.id, "address_type": addr_type}, payload)

    return {"success": True}

@router.patch("/extra")
async def update_extra(request: Request, data: ExtraUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    warn_schema_mismatch(await request.json(), ExtraUpdate, "ExtraUpdate")
    
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    generic_patch(db, StudentPersonal, {"identity_id": identity.id}, data.model_dump(exclude_unset=True))
    return {"success": True}
