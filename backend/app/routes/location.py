from fastapi import APIRouter, Depends
from app.database import get_db
from app.models import Province, Ward
from sqlalchemy.orm import Session

router = APIRouter(prefix="/location", tags=["Location"])

@router.get("/provinces")
def get_provinces(db: Session = Depends(get_db)):
    # Trả về danh sách 34 tỉnh thành để sinh viên chọn mục
    return db.query(Province).all()

@router.get("/provinces/{province_id}/wards")
def get_wards(province_id: int, db: Session = Depends(get_db)):
    # Trả về danh sách phường xã dựa trên tỉnh đã chọn
    return db.query(models.Ward).filter(models.Ward.province_id == province_id).all()