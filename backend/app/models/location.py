from app.models.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Constraint
from sqlalchemy.orm import relationship

class Province(Base):
    __tablename__ = "provinces"
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False) # "Thành phố Đà Nẵng"

class Ward(Base):
    __tablename__ = "wards"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False) # "phường An Hải"
    province_id = Column(Integer, ForeignKey("provinces.id"))