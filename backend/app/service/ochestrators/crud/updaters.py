from typing import Type, TypeVar, Dict, Any, Optional, Set
from sqlalchemy.orm import Session
from app.models.base import Base
from app.service.ochestrators.core import CoreEngine

T = TypeVar("T", bound=Base)

def generic_patch(
    db: Session, 
    model: Type[T], 
    filter_criteria: Dict[str, Any], 
    payload: Dict[str, Any], 
    defaults: Optional[Dict[str, Any]] = None,
    exclude_fields: Optional[Set[str]] = None
) -> T:
    """
    Generic Updater (PATCH): Updates an existing record or creates a new one (Upsert).
    
    Args:
        db: Database session.
        model: SQLAlchemy model class.
        filter_criteria: Criteria to find the record.
        payload: Data to update/merge.
        defaults: Default values for new instance if created.
        exclude_fields: Fields to exclude from update.
        
    Returns:
        The updated or created object.
    """
    # Core Engine: Prepare and Merge
    obj, is_new, has_changes = CoreEngine.prepare_and_merge(
        db, model, filter_criteria, payload, defaults, exclude_fields
    )
    
    # Logic: Handle DB operations based on state
    if is_new:
        db.add(obj)
        
    # Commit if it's a new record or if there were actual changes to an existing one
    if is_new or has_changes:
        db.commit()
        db.refresh(obj)
        
    return obj
