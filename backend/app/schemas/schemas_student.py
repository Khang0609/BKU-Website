from typing import Optional, Dict
from pydantic import BaseModel, Field
from datetime import date
from app.constants import PriorityGroup, PriorityArea

class PersonalUpdate(BaseModel):
    priority_area: Optional[PriorityArea] = None
    priority_group: Optional[PriorityGroup] = None
    union_date: Optional[date] = None
    party_date: Optional[date] = None
    youth_union_date: Optional[date] = None # Added

class ContactUpdate(BaseModel):
    family_phone: Optional[str] = None
    dorm_room: Optional[str] = None
    student_email: Optional[str] = None # Added

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
