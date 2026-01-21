from typing import Type, TypeVar, Dict, Any
from sqlalchemy.orm import Session
from app.models.base import Base

T = TypeVar("T", bound=Base)

def generic_delete(
    db: Session, 
    model: Type[T], 
    filter_criteria: Dict[str, Any]
) -> bool:
    """
    Generic Deleter (DELETE): Deletes a record identified by filter_criteria.
    
    Args:
        db: Database session.
        model: SQLAlchemy model class.
        filter_criteria: Criteria to find the record to delete.
        
    Returns:
        bool: True if deleted, False if not found.
    """
    obj = db.query(model).filter_by(**filter_criteria).first()
    
    if obj:
        db.delete(obj)
        db.commit()
        return True
    
    return False
