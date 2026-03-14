from typing import Optional, Dict
from pydantic import BaseModel, Field, ConfigDict
from datetime import date
from app.constants import PriorityGroup, PriorityArea
from app.models.adminstrative.decision import DecisionType
from app.models.adminstrative.extra_curricular import ExtraCurricularState


class PersonalUpdate(BaseModel):
    priority_area: Optional[PriorityArea] = None
    priority_group: Optional[PriorityGroup] = None
    union_date: Optional[date] = None
    party_date: Optional[date] = None
    youth_union_date: Optional[date] = None # Added

class ContactUpdate(BaseModel):
    family_phone: Optional[str] = None
    dorm_room: Optional[str] = None

    # Current Address
    current_province_id: Optional[int] = None
    current_ward_id: Optional[int] = None
    current_detail: Optional[str] = Field(None, alias="current_house_number")

    # Permanent Address
    permanent_province_id: Optional[int] = None
    permanent_ward_id: Optional[int] = None
    permanent_detail: Optional[str] = Field(None, alias="permanent_house_number")

class FamilyUpdate(BaseModel):
    # Parents (Father)
    father_name: Optional[str] = None
    father_birthday: Optional[date] = None # Renamed from year_of_birth
    father_job: Optional[str] = None
    father_workplace: Optional[str] = None
    father_phone: Optional[str] = None
    
    # Parents (Mother)
    mother_name: Optional[str] = None
    mother_birthday: Optional[date] = None # Renamed from year_of_birth
    mother_job: Optional[str] = None
    mother_workplace: Optional[str] = None
    mother_phone: Optional[str] = None
    
    # Guardian
    guardian_full_name: Optional[str] = None
    guardian_relationship_to_student: Optional[str] = None # Renamed from relationship
    guardian_phone_number: Optional[str] = None # Renamed from phone
    guardian_email: Optional[str] = None
    guardian_job: Optional[str] = None
    guardian_citizen_id: Optional[str] = None # Added
    guardian_is_emergency_contact: Optional[bool] = None # Added
    
    # Guardian Address
    guardian_province_id: Optional[int] = None
    guardian_ward_id: Optional[int] = None
    guardian_detail: Optional[str] = Field(None, alias="guardian_house_number") # Renamed from house_number

class ExtraUpdate(BaseModel):
    social_media: Optional[Dict[str, str]] = None


# Decision Response 
class StudentDecisionRes(BaseModel):
    id: int
    semester: str
    decision_reason: str
    decision_number: str
    decision_content: str
    signed_date: str
    last_updated: str
    decision_type: DecisionType
    note: Optional[str] = None

class TrainingPointRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    semester: str
    points: int
    rating: str
    updated_at: str

class ExtraCurricularRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int # bridge table id
    curricular_id: str # extra_curriculars.id
    name: str
    address: str
    day_start: str
    duration_days: int
    has_proof: bool
    state: ExtraCurricularState
    social_work_days_exchange: int
    is_verified: bool
