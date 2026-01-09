from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.location import Province, Ward, Country
from app.models.ethnic import Ethnic
from app.models.religion import Religion

router = APIRouter(prefix="/location", tags=["Location"])

@router.get("/countries")
def get_countries(db: Session = Depends(get_db)):
    return db.query(Country).all()

@router.get("/provinces")
def get_provinces(db: Session = Depends(get_db)):
    return db.query(Province).all()

@router.get("/provinces/{province_id}/wards")
def get_wards(province_id: int, db: Session = Depends(get_db)):
    return db.query(Ward).filter(Ward.province_id == province_id).all()

@router.get("/ethnics")
def get_ethnics(db: Session = Depends(get_db)):
    return db.query(Ethnic).all()

@router.get("/religions")
def get_religions(db: Session = Depends(get_db)):
    return db.query(Religion).all()