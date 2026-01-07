from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserRole
from app.routes.auth import get_current_active_user
from typing import Optional, List
from pydantic import BaseModel
from datetime import date, datetime

router = APIRouter(
    prefix="/profile/student",
    tags=["profile"],
    responses={404: {"description": "Not found"}},
)

# --- Response Schemas ---
class StudentPersonalRes(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    dob: Optional[date] = None
    gender: Optional[str] = None
    national_id: Optional[str] = None
    id_issue_date: Optional[date] = None
    id_issue_place: Optional[str] = None
    social_insurance: Optional[str] = None
    avatar_url: Optional[str] = None
    
class StudentContactRes(BaseModel):
    email: Optional[str] = None
    personal_email: Optional[str] = None
    phone: Optional[str] = None
    address_permanent: Optional[str] = None
    address_current: Optional[str] = None
    
class StudentAcademicRes(BaseModel):
    student_id: Optional[str] = None
    faculty: Optional[str] = None
    major: Optional[str] = None
    class_code: Optional[str] = None
    enrollment_year: Optional[int] = None
    entry_semester: Optional[str] = None
    study_duration_standard: Optional[str] = None
    max_semesters: Optional[int] = None
    status: Optional[str] = None

class StudentGraduationRes(BaseModel):
    grad_major: Optional[str] = None
    grad_year_semester: Optional[str] = None
    grad_decision_number: Optional[str] = None
    grad_decision_date: Optional[date] = None

class StudentBankRes(BaseModel):
    bank_account: Optional[str] = None
    bank_name: Optional[str] = None
    ocb_cif: Optional[str] = None

class StudentOtherRes(BaseModel):
    note: Optional[str] = None

class StudentParentRes(BaseModel):
    father_name: Optional[str] = None
    father_birthday: Optional[date] = None
    father_phone: Optional[str] = None
    father_job: Optional[str] = None
    father_workplace: Optional[str] = None
    mother_name: Optional[str] = None
    mother_birthday: Optional[date] = None
    mother_phone: Optional[str] = None
    mother_job: Optional[str] = None
    mother_workplace: Optional[str] = None

class StudentGuardianRes(BaseModel):
    full_name: Optional[str] = None
    relationship: Optional[str] = None
    phone_number: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    job: Optional[str] = None

class StudentFamilyRes(BaseModel):
    parents: Optional[StudentParentRes] = None
    guardian: Optional[StudentGuardianRes] = None

class StudentProfileResponse(BaseModel):
    personal: StudentPersonalRes
    contact: StudentContactRes
    academic: StudentAcademicRes
    graduation: StudentGraduationRes
    bank: StudentBankRes
    other: StudentOtherRes
    family: StudentFamilyRes
    last_updated_at: Optional[datetime] = None

@router.get("/me", response_model=StudentProfileResponse)
async def read_student_me(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
        
    identity = current_user.identity
    if not identity:
        raise HTTPException(status_code=404, detail="Identity not found")
        
    academic = identity.student_academic
    personal = identity.student_personal
    addresses = identity.student_addresses
    parents = identity.student_parent
    guardian = identity.student_guardian
    
    # Map Personal
    p_res = StudentPersonalRes(
        first_name=personal.first_name if personal else None,
        last_name=personal.last_name if personal else None,
        dob=identity.date_of_birth,
        gender=identity.gender.value if identity.gender else None,
        national_id=personal.id_card_number if personal else identity.identity_card,
        id_issue_date=personal.id_card_date if personal else None,
        id_issue_place=personal.id_card_place if personal else None,
        avatar_url=personal.avatar_url if personal else None
    )
    
    # Map Contact
    perm_addr = next((a for a in addresses if a.address_type == "PERMANENT"), None)
    curr_addr = next((a for a in addresses if a.address_type == "CURRENT"), None)
    
    def format_addr(addr):
        if not addr: return "N/A"
        try:
            p_name = addr.province.name if addr.province else ""
            w_name = addr.ward.name if addr.ward else ""
            return f"{addr.house_number or ''} {addr.street or ''}, {w_name}, {p_name}"
        except:
            return f"{addr.house_number or ''} {addr.street or ''}"

    c_res = StudentContactRes(
        email=current_user.email,
        personal_email=personal.personal_email if personal else None,
        phone=personal.phone if personal else None,
        address_permanent=format_addr(perm_addr),
        address_current=format_addr(curr_addr)
    )
    
    # Map Academic
    # Faculty is via Major
    major_name = "N/A"
    faculty_name = "N/A"
    
    if academic and academic.major:
        major_name = academic.major.name
        if academic.major.faculty:
            faculty_name = academic.major.faculty.name
            
    a_res = StudentAcademicRes(
        student_id=academic.student_code if academic else None,
        faculty=faculty_name,
        major=major_name,
        class_code=academic.class_code if academic else None,
        enrollment_year=academic.curriculum_year if academic else None,
        entry_semester=academic.entry_semester if academic else None,
        study_duration_standard=academic.study_duration_standard if academic else None,
        max_semesters=academic.max_semesters if academic else None,
        status=academic.student_status if academic else "Unknown"
    )

    # Map Graduation
    g_res = StudentGraduationRes(
        grad_major=academic.grad_major if academic else None,
        grad_year_semester=academic.grad_year_semester if academic else None,
        grad_decision_number=academic.grad_decision_number if academic else None,
        grad_decision_date=academic.grad_decision_date if academic else None
    )

    # Map Bank
    b_res = StudentBankRes(
        bank_account=academic.bank_account if academic else None,
        bank_name=academic.bank_name if academic else None,
        ocb_cif=academic.ocb_cif if academic else None
    )

    # Map Other
    o_res = StudentOtherRes(
        note=academic.note if academic else None
    )

    # Map Family
    par_res = None
    if parents:
        par_res = StudentParentRes(
            father_name=parents.father_name,
            father_birthday=parents.father_birthday,
            father_phone=parents.father_phone,
            father_job=parents.father_job,
            father_workplace=parents.father_workplace,
            mother_name=parents.mother_name,
            mother_birthday=parents.mother_birthday,
            mother_phone=parents.mother_phone,
            mother_job=parents.mother_job,
            mother_workplace=parents.mother_workplace,
        )

    gua_res = None
    if guardian:
        gua_res = StudentGuardianRes(
            full_name=guardian.full_name,
            relationship=guardian.relationship_to_student,
            phone_number=guardian.phone_number,
            email=guardian.email,
            address=guardian.address,
            job=guardian.job
        )

    f_res = StudentFamilyRes(
        parents=par_res,
        guardian=gua_res
    )
    
    return StudentProfileResponse(
        personal=p_res,
        contact=c_res,
        academic=a_res,
        graduation=g_res,
        bank=b_res,
        other=o_res,
        family=f_res,
        last_updated_at=identity.updated_at or identity.created_at
    )
