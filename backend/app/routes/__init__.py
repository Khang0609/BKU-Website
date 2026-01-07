from .auth import router as auth_router
from .location import router as location_router
from .profile import student_router

# Tạo một list chứa tất cả
all_routers = [auth_router, location_router, student_router]