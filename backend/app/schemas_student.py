from typing import Optional, Dict
from pydantic import BaseModel
from datetime import date
from app.constants import Gender, PriorityGroup, PriorityArea

class PersonalUpdate(BaseModel):
    nationality: Optional[str] = None
    place_of_birth: Optional[str] = None
    other_birthplace: Optional[str] = None
    religion_id: Optional[int] = None
    ethnic_id: Optional[int] = None
    priority_area: Optional[PriorityArea] = None
    priority_group: Optional[PriorityGroup] = None
    union_date: Optional[date] = None
    party_date: Optional[date] = None
    
    # ID Card
    id_card_number: Optional[str] = None
    id_card_date: Optional[date] = None
    id_card_place: Optional[str] = None

class ContactUpdate(BaseModel):
    # Permanent Address
    permanent_province_id: Optional[int] = None
    permanent_ward_id: Optional[int] = None
    permanent_house_number: Optional[str] = None
    
    # Current Address / Contact
    current_province_id: Optional[int] = None
    current_ward_id: Optional[int] = None
    current_house_number: Optional[str] = None
    
    phone: Optional[str] = None
    family_phone: Optional[str] = None
    dorm_room: Optional[str] = None
    personal_email: Optional[str] = None

class FamilyUpdate(BaseModel):
    # Parents (Father)
    father_name: Optional[str] = None
    father_year_of_birth: Optional[int] = None # User said Year of Birth
    father_job: Optional[str] = None
    father_workplace: Optional[str] = None
    father_phone: Optional[str] = None
    
    # Parents (Mother)
    mother_name: Optional[str] = None
    mother_year_of_birth: Optional[int] = None
    mother_job: Optional[str] = None
    mother_workplace: Optional[str] = None
    mother_phone: Optional[str] = None
    
    # Guardian
    guardian_full_name: Optional[str] = None
    guardian_relationship: Optional[str] = None
    guardian_phone: Optional[str] = None
    guardian_email: Optional[str] = None
    guardian_job: Optional[str] = None
    guardian_province_id: Optional[int] = None
    guardian_ward_id: Optional[int] = None
    guardian_house_number: Optional[str] = None

class ExtraUpdate(BaseModel):
    social_media: Optional[Dict[str, str]] = None
