from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field, AliasPath, ConfigDict, computed_field, model_validator
from datetime import date, datetime
from app.models.adminstrative.decision import DecisionType

# --- Helper Models for nested parts ---

class PersonalRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    first_name: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "first_name"))
    last_name: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "last_name"))
    dob: Optional[date] = Field(None, validation_alias=AliasPath("general_information", "date_of_birth"))
    gender: Optional[Any] = Field(None, validation_alias=AliasPath("general_information", "gender")) # Handle Enum value
    national_id: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "id_card_number"))
    id_issue_date: Optional[date] = Field(None, validation_alias=AliasPath("general_information", "id_card_date"))
    id_issue_place: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "id_card_place"))
    
    nationality_id: Optional[int] = Field(None, validation_alias=AliasPath("general_information", "nationality_id"))
    place_of_birth: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "place_of_birth"))
    other_birthplace: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "other_place_of_birth"))
    religion_id: Optional[int] = Field(None, validation_alias=AliasPath("general_information", "religion_id"))
    ethnic_id: Optional[int] = Field(None, validation_alias=AliasPath("general_information", "ethnic_id"))
    
    priority_area: Optional[Any] = Field(None, validation_alias=AliasPath("student_personal", "priority_area"))
    priority_group: Optional[Any] = Field(None, validation_alias=AliasPath("student_personal", "priority_group"))
    
    union_date: Optional[date] = Field(None, validation_alias=AliasPath("student_personal", "union_date"))
    party_date: Optional[date] = Field(None, validation_alias=AliasPath("student_personal", "party_date"))

    @model_validator(mode='after')
    def extract_enum_values(self):
        # Enums might be returned as objects, we want values
        if hasattr(self.gender, 'value'): self.gender = self.gender.value
        if hasattr(self.priority_area, 'value'): self.priority_area = self.priority_area.value
        if hasattr(self.priority_group, 'value'): self.priority_group = self.priority_group.value
        return self

class AcademicRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    student_id: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "student_code"))
    class_code: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "class_code"))
    major: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "major", "name"))
    faculty: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "major", "faculty", "name"))
    enrollment_date: Optional[date] = Field(None, validation_alias=AliasPath("student_academic", "enrollment_date"))
    student_status: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "student_status"))
    education_level: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "education_level"))
    training_system: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "training_system"))
    campus: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "campus"))
    entry_semester: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "entry_semester"))
    
    bank_account: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "bank_account"))
    bank_name: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "bank_name"))
    bknet_account: Optional[str] = Field(None, validation_alias=AliasPath("student_academic", "bknet_account"))

class AddressRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    country_id: Optional[int] = 1 # Default Vietnam
    province_id: Optional[int] = None
    ward_id: Optional[int] = None
    province_name: Optional[str] = Field(None, validation_alias=AliasPath("province", "name"))
    ward_name: Optional[str] = Field(None, validation_alias=AliasPath("ward", "name"))
    house_number: Optional[str] = Field(None, validation_alias="detail")
    full_address: Optional[str] = None 
    
    @computed_field
    def computed_full_address(self) -> Optional[str]:
        # Simple reconstruction matching original logic
        parts = []
        if self.house_number: parts.append(self.house_number)
        if self.ward_name: parts.append(self.ward_name)
        if self.province_name: parts.append(self.province_name)
        return ", ".join(parts) if parts else None
    
    @model_validator(mode='after')
    def set_full_address(self):
        if not self.full_address:
            self.full_address = self.computed_full_address
        return self

class ContactRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    # We will pass a specific context object to this model
    province_id: Optional[int] = Field(None, validation_alias=AliasPath("address", "province_id"))
    ward_id: Optional[int] = Field(None, validation_alias=AliasPath("address", "ward_id"))
    province_name: Optional[str] = Field(None, validation_alias=AliasPath("address", "province", "name"))
    ward_name: Optional[str] = Field(None, validation_alias=AliasPath("address", "ward", "name"))
    house_number: Optional[str] = Field(None, validation_alias=AliasPath("address", "detail"))
    
    phone: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "phone"))
    personal_email: Optional[str] = Field(None, validation_alias=AliasPath("general_information", "personal_email"))
    
    family_phone: Optional[str] = Field(None, validation_alias=AliasPath("student_personal", "family_phone"))
    dorm_room: Optional[str] = Field(None, validation_alias=AliasPath("student_personal", "dorm_room"))
    student_email: Optional[str] = Field(None, validation_alias=AliasPath("student_personal", "student_email"))

    full_address: Optional[str] = None
    
    @computed_field
    def computed_full_address(self) -> Optional[str]:
        parts = []
        if self.house_number: parts.append(self.house_number)
        if self.ward_name: parts.append(self.ward_name)
        if self.province_name: parts.append(self.province_name)
        return ", ".join(parts) if parts else None
        
    @model_validator(mode='after')
    def set_full_address(self):
        if not self.full_address:
            self.full_address = self.computed_full_address
        return self

class FamilyRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    parents: Optional[Dict[str, Any]] = None
    guardian: Optional[Dict[str, Any]] = None
    
    # We construct this with custom logic in computed_field of ProfileResponse 
    # OR we make this smarter. But nested dicts are easiest constructed there.

class OtherRes(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    social_media: Optional[Dict[str, str]] = Field(None, validation_alias=AliasPath("student_personal", "social_media"))
    photo_record_note: Optional[str] = None

# --- Main Profile Response ---

class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    # Exclude raw fields from JSON output
    general_information: Optional[Any] = Field(None, exclude=True)
    student_personal: Optional[Any] = Field(None, exclude=True)
    student_academic: Optional[Any] = Field(None, exclude=True)
    student_parent: Optional[Any] = Field(None, exclude=True)
    student_guardian: Optional[Any] = Field(None, exclude=True)
    addresses: List[Any] = Field(default=[], exclude=True)
    
    updated_at: Optional[datetime] = Field(None, exclude=True)
    created_at: Optional[datetime] = Field(None, exclude=True)

    @computed_field
    def last_updated_at(self) -> Optional[datetime]:
        return self.updated_at if self.updated_at else self.created_at

    @computed_field
    def personal(self) -> PersonalRes:
        # Pass 'self' (the ProfileResponse instance which has the data) as context?
        # Actually validation_alias works on the input to model_validate (the ORM object).
        # But here we are inside the model. 
        # We need to construct PersonalRes from the SAME ORM object.
        # But we don't have the ORM object here, we have 'self' which has the fields.
        # Since 'self' has 'general_information' etc matching the aliases, 
        # we can just validate 'self' into PersonalRes!
        return PersonalRes.model_validate(self)

    @computed_field
    def academic(self) -> AcademicRes:
        return AcademicRes.model_validate(self)

    @computed_field
    def permanent_address(self) -> AddressRes:
        perm = next((a for a in self.addresses if a.address_type == "PERMANENT"), None)
        return AddressRes.model_validate(perm) if perm else AddressRes()

    @computed_field
    def contact(self) -> ContactRes:
        curr = next((a for a in self.addresses if a.address_type == "CURRENT"), None)
        # Create a hybrid context object that mimics the structure ContactRes expects
        context = {
            "address": curr,
            "general_information": self.general_information,
            "student_personal": self.student_personal
        }
        return ContactRes.model_validate(context)

    @computed_field
    def family(self) -> FamilyRes:
        p = self.student_parent
        g = self.student_guardian
        
        # Guardian Address must be found from addresses
        gua_addr = next((a for a in self.addresses if a.address_type == "GUARDIAN"), None)
        
        parents_data = {}
        if p:
            parents_data = {
                "father_name": p.father_name, "father_birthday": p.father_birthday, 
                "father_phone": p.father_phone, "father_job": p.father_job, 
                "father_workplace": p.father_workplace,
                "mother_name": p.mother_name, "mother_birthday": p.mother_birthday, 
                "mother_phone": p.mother_phone, "mother_job": p.mother_job, 
                "mother_workplace": p.mother_workplace
            }
            
        guardian_data = {}
        if g:
            guardian_data = {
                "full_name": g.full_name, "relationship": g.relationship_to_student, 
                "phone_number": g.phone_number, "email": g.email, 
                "province_id": gua_addr.province_id if gua_addr else None, 
                "ward_id": gua_addr.ward_id if gua_addr else None, 
                "house_number": gua_addr.detail if gua_addr else None,
                "job": g.job
            }
            
        return FamilyRes(parents=parents_data, guardian=guardian_data)

    @computed_field
    def others(self) -> OtherRes:
        return OtherRes.model_validate(self)

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
