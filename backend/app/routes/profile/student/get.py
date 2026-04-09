from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.database import get_db
from app.models import User, UserRole, Identity
from app.models.profile.student.academic import StudentAcademic
from app.models.profile.student.parent import StudentParent
from app.models.profile.student.guardian import StudentGuardian
from app.models.profile.student.personal import StudentPersonal
from app.models.profile.student.finance import StudentFinance
from app.models.profile.shared.address import Address
from app.models.profile.student.decision import StudentDecision
from app.models.profile.student.training_point import StudentTrainingPoint
from app.models.profile.student.extra_curricular import StudentExtraCurricular
from app.models.profile.student.program import StudentProgram
from app.models.profile.student.timeline import StudentTimeline
from app.models.profile.student.graduation import StudentGraduation
from app.models.profile.shared.health_insurance import HealthInsurance
from app.models.profile.student.anchor import StudentRoleAnchor
from app.models.profile.student.extra_curricular import StudentExtraCurricular
from app.models.adminstrative.decision import Decision
from app.models.adminstrative.extra_curricular import ExtraCurricular
from app.models.adminstrative.academic import Major, Faculty

from app.routes.auth import get_current_active_user
from app.service.ochestrators.crud.readers import generic_get
from app.schemas.schemas_profile import ProfileResponse
from app.schemas.schemas_student import StudentDecisionRes, TrainingPointRes, ExtraCurricularRes, ScholarshipRes, HealthInsuranceRes
from app.models.academic_performance import ScholarshipRecipient, ScholarshipStatus
from app.models.adminstrative.scholarship import Scholarship
from app.models.adminstrative.semester import Semester

router = APIRouter()

@router.get("/me", response_model=ProfileResponse)
async def read_student_me(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Efficiently fetches the Student Profile using Smart Reader (generic_get).
    - Uses joinedload for single-trip database fetching.
    - Uses Hydration (via ensure_relations) to attach default objects for missing data.
    - Uses Flat Contract (ProfileResponse) to automatically map nested ORM data to the API response.
    """
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")

    # Efficient Fetch with Smart Hydration of Defaults
    identity = generic_get(
        db,
        Identity,
        filter_criteria={"id": current_user.identity.id},
        options=[
            joinedload(Identity.user),
            joinedload(Identity.general_information),
            # Anchor-based modular relations (Nested Hub)
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_personal),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_academic),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.major).joinedload(Major.faculty),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_finance),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_program),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_timeline),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_graduation),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_parent),
            joinedload(Identity.student_anchor).joinedload(StudentRoleAnchor.student_guardian),

            # Addresses
            joinedload(Identity.addresses).joinedload(Address.province),
            joinedload(Identity.addresses).joinedload(Address.ward),
        ],

        ensure_relations={
            # Hydration for Anchor and its nested models
            "student_anchor": (StudentRoleAnchor, {"identity_id": "id"}),
            "student_anchor.student_personal": (StudentPersonal, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_academic": (StudentAcademic, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_finance": (StudentFinance, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_parent": (StudentParent, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_guardian": (StudentGuardian, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_program": (StudentProgram, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_timeline": (StudentTimeline, {"anchor_id": "student_anchor.identity_id"}),
            "student_anchor.student_graduation": (StudentGraduation, {"anchor_id": "student_anchor.identity_id"}),
            # Note: general_information is assumed to exist for any valid user, 
            # and addresses are a list which generic_get's ensure_relations doesn't target (it targets 1-1/M-1 attrs).
        }
    )

    if not identity:
        raise HTTPException(status_code=404, detail="Student profile not found")

    # One-line Pydantic Validation & Flattening
    response = ProfileResponse.model_validate(identity)
    return response

@router.get("/decision", response_model=List[StudentDecisionRes])
async def get_student_decisions(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    student_decisions = db.query(StudentDecision).filter(StudentDecision.anchor_id == identity.id).join(Decision).all()
    
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

@router.get("/training-points", response_model=List[TrainingPointRes])
async def get_student_training_points(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    training_points = db.query(StudentTrainingPoint).filter(StudentTrainingPoint.anchor_id == identity.id).all()
    
    return [
        TrainingPointRes(
            id=tp.id,
            semester=tp.semester,
            points=tp.points,
            rating=tp.rating,
            updated_at=tp.updated_at
        ) for tp in training_points
    ]

@router.get("/extra-curriculars", response_model=List[ExtraCurricularRes])
async def get_student_extra_curriculars(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    student_ec_list = db.query(StudentExtraCurricular).filter(StudentExtraCurricular.anchor_id == identity.id).join(ExtraCurricular).all()
    
    results = []
    for sec in student_ec_list:
        ec = sec.extra_curricular
        results.append(ExtraCurricularRes(
            id=sec.id,
            curricular_id=ec.id,
            name=ec.name,
            address=ec.address,
            day_start=ec.day_start,
            duration_days=ec.duration_days,
            has_proof=ec.has_proof,
            state=ec.state,
            social_work_days_exchange=sec.social_work_days_exchange,
            is_verified=sec.is_verified
        ))
        
    return results


@router.get("/scholarship", response_model=List[ScholarshipRes])
async def get_student_scholarships(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    scholarship_recipients = (
        db.query(ScholarshipRecipient)
        .filter(ScholarshipRecipient.anchor_id == identity.id)
        .join(Scholarship)
        .all()
    )
    
    results = []
    for sr in scholarship_recipients:
        results.append(ScholarshipRes(
            id=sr.id,
            semester=sr.semester_id,
            gpa_4=sr.gpa_4,
            gpa_10=sr.gpa_10,
            cpa_4=sr.cpa_4,
            cpa_10=sr.cpa_10,
            credits_earned=sr.credits_earned,
            cumulative_credits=sr.cumulative_credits,
            training_point=sr.training_point,
            eligible="Đạt" if sr.status == ScholarshipStatus.APPROVED else "Đang xét",
            scholarship_level=sr.scholarship.name,
            amount=sr.amount,
            result=sr.result or ("Đạt" if sr.status == ScholarshipStatus.APPROVED else "Đang xét"),
            created_at=sr.created_at,
            created_by=sr.created_by,
            updated_at=sr.updated_at,
            updated_by=sr.updated_by
        ))
        
    return results


@router.get("/health_insurance", response_model=HealthInsuranceRes)
async def get_student_health_insurance(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")

    identity = current_user.identity
    insurance = db.query(HealthInsurance).filter(HealthInsurance.identity_id == identity.id).first()

    if not insurance:
        raise HTTPException(status_code=404, detail="Health insurance information not found")

    return insurance


