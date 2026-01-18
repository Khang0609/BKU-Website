from typing import Optional, Dict
from pydantic import BaseModel
from datetime import date, datetime

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

from app.models.adminstrative.decision import DecisionType

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
