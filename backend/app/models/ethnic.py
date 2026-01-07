from app.models.base import Base
from sqlalchemy import Column, Integer, String

class Ethnic(Base):
    __tablename__ = "ethnics"
    
    id = Column(Integer, primary_key=True, index=True)
    name_vi = Column(String, nullable=False, unique=True) # Vietnamese name from text file
    name_en = Column(String, nullable=True) # English name (nullable)
