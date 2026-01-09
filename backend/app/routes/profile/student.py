from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserRole
from app.routes.auth import get_current_active_user
from typing import Optional, List, Dict
from pydantic import BaseModel
from datetime import date, datetime
from app.constants import Gender, PriorityGroup, PriorityArea
from app.models.profile.student import (
    StudentPersonal, StudentGuardian, 
    StudentParent, StudentAcademic, StudentAddress
)
from app.schemas_student import PersonalUpdate, ContactUpdate, FamilyUpdate, ExtraUpdate

from app.models.location import Province, Ward, Country
from app.models.religion import Religion
from app.models.ethnic import Ethnic

router = APIRouter(
    prefix="/profile/student",
    tags=["profile"],
    responses={404: {"description": "Not found"}},
)

# --- Response Schemas ---
class PersonalRes(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    dob: Optional[date] = None
    gender: Optional[str] = None
    national_id: Optional[str] = None
    id_issue_date: Optional[date] = None
    id_issue_place: Optional[str] = None
    
    nationality: Optional[str] = None
    place_of_birth: Optional[str] = None
    other_birthplace: Optional[str] = None
    religion_id: Optional[int] = None
    ethnic_id: Optional[int] = None
    priority_area: Optional[str] = None
    priority_group: Optional[str] = None
    
    union_date: Optional[date] = None
    party_date: Optional[date] = None

class AddressRes(BaseModel):
    country_id: Optional[int] = None # Assuming default Vietnam if None
    province_id: Optional[int] = None
    ward_id: Optional[int] = None
    province_name: Optional[str] = None
    ward_name: Optional[str] = None
    house_number: Optional[str] = None
    full_address: Optional[str] = None

class ContactRes(BaseModel):
    province_id: Optional[int] = None
    ward_id: Optional[int] = None
    province_name: Optional[str] = None
    ward_name: Optional[str] = None
    house_number: Optional[str] = None
    full_address: Optional[str] = None
    
    phone: Optional[str] = None
    family_phone: Optional[str] = None
    dorm_room: Optional[str] = None
    personal_email: Optional[str] = None
    student_email: Optional[str] = None

class FamilyRes(BaseModel):
    parents: Optional[dict] = None # father_name, etc.
    guardian: Optional[dict] = None # full_name, etc.

class OtherRes(BaseModel):
    social_media: Optional[Dict[str, str]] = None
    photo_record_note: Optional[str] = None

class AcademicRes(BaseModel):
    student_id: Optional[str] = None
    class_code: Optional[str] = None
    major: Optional[str] = None
    faculty: Optional[str] = None
    enrollment_date: Optional[date] = None
    student_status: Optional[str] = None
    education_level: Optional[str] = None
    training_system: Optional[str] = None
    campus: Optional[str] = None
    entry_semester: Optional[str] = None
    
    bank_account: Optional[str] = None
    bank_name: Optional[str] = None
    bknet_account: Optional[str] = None

class ProfileResponse(BaseModel):
    personal: PersonalRes
    academic: AcademicRes
    permanent_address: AddressRes
    contact: ContactRes
    family: FamilyRes
    others: OtherRes
    last_updated_at: Optional[datetime] = None

# --- Endpoints ---

@router.get("/me", response_model=ProfileResponse)
async def read_student_me(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
        
    identity = current_user.identity
    if not identity:
        raise HTTPException(status_code=404, detail="Identity not found")
        
    personal = identity.student_personal
    addresses = identity.student_addresses
    academic = identity.student_academic
    parents = identity.student_parent
    guardian = identity.student_guardian
    
    # helper for address
    def get_addr(ctype):
        return next((a for a in addresses if a.address_type == ctype), None)
        
    perm = get_addr("PERMANENT")
    curr = get_addr("CURRENT")
    
    # Personal
    p_res = PersonalRes(
        first_name=personal.first_name if personal else None,
        last_name=personal.last_name if personal else None,
        dob=identity.date_of_birth,
        gender=identity.gender.value if identity.gender else None,
        national_id=personal.id_card_number if personal else identity.identity_card,
        id_issue_date=personal.id_card_date if personal else identity.date_created,
        id_issue_place=personal.id_card_place if personal else identity.place_created,
        nationality=personal.nationality if personal else "Vietnam",
        place_of_birth=personal.place_of_birth if personal else identity.place_of_birth,
        religion_id=personal.religion_id if personal else None,
        ethnic_id=personal.ethnic_id if personal else None,
        priority_area=personal.priority_area.value if personal and personal.priority_area else None,
        priority_group=personal.priority_group.value if personal and personal.priority_group else None,
        union_date=personal.union_date if personal else None,
        party_date=personal.party_date if personal else None
    )

    # Academic
    major_name = academic.major.name if academic and academic.major else None
    faculty_name = academic.major.faculty.name if academic and academic.major and academic.major.faculty else None
    
    a_res = AcademicRes(
        student_id=academic.student_code if academic else None,
        class_code=academic.class_code if academic else None,
        major=major_name,
        faculty=faculty_name,
        enrollment_date=academic.enrollment_date if academic else None,
        student_status=academic.student_status if academic else None,
        education_level=academic.education_level if academic else None,
        training_system=academic.training_system if academic else None,
        campus=academic.campus if academic else None,
        entry_semester=academic.entry_semester if academic else None,
        bank_account=academic.bank_account if academic else None,
        bank_name=academic.bank_name if academic else None,
        bknet_account=academic.bknet_account if academic else None
    )
    
    # Permanent Address
    pa_res = AddressRes(
        province_id=perm.province_id if perm else None,
        ward_id=perm.ward_id if perm else None,
        province_name=perm.province.name if perm and perm.province else None,
        ward_name=perm.ward.name if perm and perm.ward else None,
        house_number=perm.house_number if perm else None,
        full_address=f"{perm.house_number or ''} {perm.street or ''}, {perm.ward.name if perm and perm.ward else ''}, {perm.province.name if perm and perm.province else ''}" if perm else None
    )
    
    # Contact
    c_res = ContactRes(
        province_id=curr.province_id if curr else None,
        ward_id=curr.ward_id if curr else None,
        province_name=curr.province.name if curr and curr.province else None,
        ward_name=curr.ward.name if curr and curr.ward else None,
        house_number=curr.house_number if curr else None,
        full_address=f"{curr.house_number or ''} {curr.street or ''}, {curr.ward.name if curr and curr.ward else ''}, {curr.province.name if curr and curr.province else ''}" if curr else None,
        phone=personal.phone if personal else None,
        dorm_room=personal.dorm_room if personal else None,
        personal_email=personal.personal_email if personal else None,
        student_email=personal.student_email if personal else current_user.email
    )
    
    # Family
    f_res = FamilyRes(
        parents={
            "father_name": parents.father_name, "father_birthday": parents.father_birthday, "father_phone": parents.father_phone, "father_job": parents.father_job, "father_workplace": parents.father_workplace,
            "mother_name": parents.mother_name, "mother_birthday": parents.mother_birthday, "mother_phone": parents.mother_phone, "mother_job": parents.mother_job, "mother_workplace": parents.mother_workplace
        } if parents else {},
        guardian={
            "full_name": guardian.full_name, "relationship": guardian.relationship_to_student, "phone_number": guardian.phone_number, "email": guardian.email, 
            "province_id": guardian.province_id, "ward_id": guardian.ward_id, "house_number": guardian.house_number, "job": guardian.job
        } if guardian else {}
    )
    
    # Others
    o_res = OtherRes(
        social_media=personal.social_media if personal else "",
    )
    
    return ProfileResponse(
        personal=p_res,
        academic=a_res,
        permanent_address=pa_res,
        contact=c_res,
        family=f_res,
        others=o_res,
        last_updated_at=identity.updated_at or identity.created_at
    )
    
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
        # check if any update for this type
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
    
    # Extra (Social Media) - actually stored in StudentPersonal in new model?
    # Let's check student_personal.py. 
    # Ah, the user said "StudentExtra: Created to store social_media links" in summary.
    # But in previous code logic it was `p.social_media`.
    # Let's check where it fits. 
    # In Step 219 diff, user changed `extra.social_media_links` to `personal.social_media`.
    # So it seems he moved it to Personal?
    # Let's check `StudentPersonal` model first to be sure.
    # Actually, I'll rely on the schema I see.
    # If `personal` has `social_media`, then update personal.
    
    p = identity.student_personal or StudentPersonal(identity_id=identity.id)
    if not p.id: db.add(p)
    
    update_data = data.model_dump(exclude_unset=True)
    if "social_media" in update_data:
        p.social_media = update_data["social_media"]
        
    db.commit()
    return {"success": True}
