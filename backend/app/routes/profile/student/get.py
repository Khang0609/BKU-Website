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
from app.models.profile.student.extra_curricular import StudentExtraCurricular
from app.models.adminstrative.decision import Decision
from app.models.adminstrative.extra_curricular import ExtraCurricular
from app.models.adminstrative.academic import Major, Faculty

from app.routes.auth import get_current_active_user
from app.service.ochestrators.crud.readers import generic_get
from app.schemas.schemas_profile import ProfileResponse
from app.schemas.schemas_student import StudentDecisionRes, TrainingPointRes, ExtraCurricularRes

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
            joinedload(Identity.student_personal),
            joinedload(Identity.student_finance),
            # Nested relations for Academic -> Major -> Faculty
            joinedload(Identity.student_academic).joinedload(StudentAcademic.major).joinedload(Major.faculty),
            joinedload(Identity.student_program),
            joinedload(Identity.student_timeline),
            joinedload(Identity.student_graduation),
            # Addresses
            joinedload(Identity.addresses).joinedload(Address.province),
            joinedload(Identity.addresses).joinedload(Address.ward),
            # Family
            joinedload(Identity.student_parent),
            joinedload(Identity.student_guardian)
        ],
        ensure_relations={
            "student_personal": (StudentPersonal, {"identity_id": "id"}),
            "student_finance": (StudentFinance, {"identity_id": "id"}),
            "student_parent": (StudentParent, {"identity_id": "id"}),
            "student_guardian": (StudentGuardian, {"identity_id": "id"}),
            "student_program": (StudentProgram, {"identity_id": "id"}),
            "student_timeline": (StudentTimeline, {"identity_id": "id"}),
            "student_graduation": (StudentGraduation, {"identity_id": "id"}),
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

@router.get("/training-points", response_model=List[TrainingPointRes])
async def get_student_training_points(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.identity or current_user.identity.role != UserRole.STUDENT:
        raise HTTPException(status_code=400, detail="Profile available for students only")
    
    identity = current_user.identity
    training_points = db.query(StudentTrainingPoint).filter(StudentTrainingPoint.identity_id == identity.id).all()
    
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
    student_ec_list = db.query(StudentExtraCurricular).filter(StudentExtraCurricular.identity_id == identity.id).join(ExtraCurricular).all()
    
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


