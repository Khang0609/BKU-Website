from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.routes.auth import get_current_active_user
from app.models.profile.student import (
     StudentPersonal, StudentParent, 
     StudentGuardian, StudentAddress
)
from app.schemas_student import PersonalUpdate, ContactUpdate, FamilyUpdate, ExtraUpdate
from app.routes.profile.shared.utils import filter_update_data

router = APIRouter()

@router.patch("/personal")
async def update_personal(data: PersonalUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    p = identity.student_personal or StudentPersonal(identity_id=identity.id)
    if not p.id: db.add(p)
    
    # dynamic update
    update_data = data.model_dump(exclude_unset=True) # Pydantic v2
    for key, value in update_data.items():
        if hasattr(p, key):
            setattr(p, key, value)
    
    db.commit()
    return {"success": True}

@router.patch("/family")
async def update_family(data: FamilyUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    update_data = data.model_dump(exclude_unset=True)
    
    # Parents
    par = identity.student_parent or StudentParent(identity_id=identity.id)
    if not par.id: db.add(par)
    
    # Helper to map and update
    for key, value in update_data.items():
        # Match parent fields directly
        if key.startswith("father_") or key.startswith("mother_"):
             if hasattr(par, key): setattr(par, key, value)

    # Guardian
    gua = identity.student_guardian or StudentGuardian(identity_id=identity.id)
    if not gua.id: db.add(gua)
    
    # Mapping for guardian
    guardian_map = {
        "guardian_full_name": "full_name",
        "guardian_relationship": "relationship_to_student",
        "guardian_phone": "phone_number",
        "guardian_email": "email",
        "guardian_job": "job",
        "guardian_province_id": "province_id",
        "guardian_ward_id": "ward_id",
        "guardian_house_number": "house_number"
    }
    
    for req_key, model_attr in guardian_map.items():
        if req_key in update_data:
            setattr(gua, model_attr, update_data[req_key])
    
    db.commit()
    return {"success": True}

@router.patch("/contact")
async def update_contact(data: ContactUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    update_data = data.model_dump(exclude_unset=True)
    
    # Update Personal (Phone/Email)
    p = identity.student_personal or StudentPersonal(identity_id=identity.id)
    if not p.id: db.add(p)
    
    for key in ["phone", "personal_email", "dorm_room", "family_phone"]:
        if key in update_data:
            setattr(p, key, update_data[key])
    
    # Helper for Address Update
    def update_address(atype, prefix):
        # Using shared utility logic equivalent
        # Check if any field with prefix exists
        if any(k.startswith(prefix) for k in update_data.keys()):
            addr = next((a for a in identity.student_addresses if a.address_type == atype), None)
            if not addr:
                addr = StudentAddress(identity_id=identity.id, address_type=atype)
                db.add(addr)
            
            # Map fields
            map_fields = {
                f"{prefix}province_id": "province_id",
                f"{prefix}ward_id": "ward_id",
                f"{prefix}house_number": "house_number"
            }
            for req_key, mod_field in map_fields.items():
                if req_key in update_data:
                    setattr(addr, mod_field, update_data[req_key])

    update_address("PERMANENT", "permanent_")
    update_address("CURRENT", "current_")

    db.commit()
    return {"success": True}

@router.patch("/extra")
async def update_extra(data: ExtraUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    identity = current_user.identity
    if not identity: raise HTTPException(404, "Identity not found")
    
    p = identity.student_personal or StudentPersonal(identity_id=identity.id)
    if not p.id: db.add(p)
    
    update_data = data.model_dump(exclude_unset=True)
    if "social_media" in update_data:
        p.social_media = update_data["social_media"]
        
    db.commit()
    return {"success": True}
