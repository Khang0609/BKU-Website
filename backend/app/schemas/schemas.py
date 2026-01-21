from pydantic import BaseModel, EmailStr
from typing import Optional
from app.constants import UserRole

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: UserRole
    full_name: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[UserRole] = None
