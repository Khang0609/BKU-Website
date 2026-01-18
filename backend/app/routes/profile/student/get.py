from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserRole
from app.routes.auth import get_current_active_user
from app.routes.profile.shared.utils import get_address_by_type
from .schemas import (
    ProfileResponse, PersonalRes, AcademicRes, 
    AddressRes, ContactRes, FamilyRes, OtherRes,
    StudentDecisionRes
)
from typing import List
from app.models.profile.student.decision import StudentDecision
from app.models.adminstrative.decision import Decision, DecisionType

router = APIRouter()

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
    
    perm = get_address_by_type(addresses, "PERMANENT")
    curr = get_address_by_type(addresses, "CURRENT")
    
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

@router.get("/decision", response_model=List[StudentDecisionRes])
async def get_student_decisions(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    if not identity:
        raise HTTPException(status_code=404, detail="Identity not found")

    student_decisions = db.query(StudentDecision).filter(StudentDecision.identity_id == identity.id).join(Decision).all()
    
    results = []
    for sd in student_decisions:
        decision = sd.decision
        results.append(StudentDecisionRes(
            id=sd.id,
            semester=decision.semester,
            decision_reason=decision.decision_reason,
            decision_number=decision.decision_number,
            decision_content=decision.decision_content,
            signed_date=decision.signed_date,
            last_updated=decision.last_updated,
            decision_type=decision.decision_type,
            note=sd.note
        ))
        
    return results
