from .base import Base
from .auth import User, Identity, UserRole
from .academic import Faculty, Major, ManagementUnit
from .location import Province, Ward, Country
from .ethnic import Ethnic
from .religion import Religion
from .profile.student import (
    StudentAcademic, StudentPersonal, StudentAddress, 
    StudentParent, StudentGuardian, 
)

__all__ = [
    "Base", 
    "User", "Identity", "UserRole",
    "Province", "Ward", "Country", 
    "Faculty", "Major", "ManagementUnit", 
    "Ethnic", "Religion", 
    "StudentAcademic", "StudentPersonal", "StudentAddress", 
    "StudentParent", "StudentGuardian",
]