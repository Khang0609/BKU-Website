from typing import Type, TypeVar, Dict, Any, Optional, Set
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.base import Base
from app.service.ochestrators.core import hydrate, merge

T = TypeVar("T", bound=Base)

def generic_post(
    db: Session, 
    model: Type[T], 
    payload: Dict[str, Any], 
    unique_criteria: Dict[str, Any],
    exclude_fields: Optional[Set[str]] = None
) -> T:
    """
    Generic Creator (POST): Creates a new record if it doesn't exist.
    
    Args:
        db: Database session.
        model: SQLAlchemy model class.
        payload: Data to populate the new record.
        unique_criteria: Criteria to check for existing records (uniqueness check).
        exclude_fields: Fields to exclude from the merge/population.
        
    Returns:
        The created object.
        
    Raises:
        HTTPException(409): If the record already exists.
    """
    # 1. Hydrate to check existence
    # We pass strict=True conceptual logic here by checking is_new
    obj, is_new = hydrate(db, model, unique_criteria)
    
    if not is_new:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"{model.__name__} record already exists."
        )
        
    # 2. Merge payload data into the new object
    merge(obj, payload, exclude_fields)
    
    # 3. Commit
    db.add(obj)
    db.commit()
    db.refresh(obj)
    
    return obj
