from typing import Optional, Dict
from pydantic import BaseModel
from datetime import date
from app.constants import Gender, PriorityGroup, PriorityArea

class PersonalUpdate(BaseModel):
    nationality_id: Optional[int] = None
    place_of_birth: Optional[str] = None
    other_place_of_birth: Optional[str] = None # Renamed from other_birthplace
    religion_id: Optional[int] = None
    ethnic_id: Optional[int] = None
    priority_area: Optional[PriorityArea] = None
    priority_group: Optional[PriorityGroup] = None
    union_date: Optional[date] = None
    party_date: Optional[date] = None
    youth_union_date: Optional[date] = None # Added
    
    # ID Card
    id_card_number: Optional[str] = None
    id_card_date: Optional[date] = None
    id_card_place: Optional[str] = None

class ContactUpdate(BaseModel):
    # Permanent Address
    permanent_province_id: Optional[int] = None
    permanent_ward_id: Optional[int] = None
    permanent_detail: Optional[str] = None # Renamed from house_number
    
    # Current Address / Contact
    current_province_id: Optional[int] = None
    current_ward_id: Optional[int] = None
    current_detail: Optional[str] = None # Renamed from house_number
    
    phone: Optional[str] = None
    family_phone: Optional[str] = None
    dorm_room: Optional[str] = None
    personal_email: Optional[str] = None
    student_email: Optional[str] = None # Added
    backup_email: Optional[str] = None # Added

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
    guardian_detail: Optional[str] = None # Renamed from house_number

class ExtraUpdate(BaseModel):
    social_media: Optional[Dict[str, str]] = None
