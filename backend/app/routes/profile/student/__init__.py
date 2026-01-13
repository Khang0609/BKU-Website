from fastapi import APIRouter
from .get import router as get_router
from .update import router as update_router

router = APIRouter(
    prefix="/profile/student",
    tags=["profile"],
    responses={404: {"description": "Not found"}},
)

router.include_router(get_router)
router.include_router(update_router)
