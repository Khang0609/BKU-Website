from typing import Type, TypeVar, Dict, Any, Optional, List, Tuple
from sqlalchemy.orm import Session
from app.models.base import Base
from app.service.ochestrators.core import hydrate

T = TypeVar("T", bound=Base)

def generic_get(
    db: Session, 
    model: Type[T], 
    filter_criteria: Dict[str, Any], 
    options: Optional[List[Any]] = None,
    ensure_relations: Optional[Dict[str, Tuple[Type[Base], Dict[str, str]]]] = None
) -> Optional[T]:
    """
    Generic Reader (GET): Fetches a record with support for Eager Loading and Smart Hydration.
    
    Args:
        db: Database session.
        model: SQLAlchemy model class.
        filter_criteria: Criteria to find the record.
        options: List of SQLAlchemy query options (e.g. joinedload, selectinload).
        ensure_relations: Dictionary defining relationships to guarantee existence of.
                          Format: { 'relation_name': (ModelClass, {'child_col': 'parent_col'}) }
                          Example: { 'address': (Address, {'identity_id': 'id'}) }
                          If the relation is None, 'hydrate' is used to create a default instance
                          linked to the parent using the mapping provided.
        
    Returns:
        The object T (with potential default relations attached) or None if not found.
    """
    
    # 1. Build Query
    query = db.query(model)
    
    if options:
        for opt in options:
            query = query.options(opt)
            
    # 2. Fetch
    obj = query.filter_by(**filter_criteria).first()
    
    if not obj:
        return None
        
    # 3. Smart Integration: Ensure Relations
    if ensure_relations:
        for rel_name, (rel_model, fk_map) in ensure_relations.items():
            
            # Check if relationship is missing (None)
            if getattr(obj, rel_name) is None:
                
                # Build criteria for child based on parent's values
                # e.g. parent.id -> child.identity_id
                child_criteria = {}
                for child_col, parent_col in fk_map.items():
                    parent_val = getattr(obj, parent_col, None)
                    if parent_val is not None:
                        child_criteria[child_col] = parent_val
                
                # Use Hydrator to get a default instance (usually is_new=True here essentially)
                # We don't care if it's new or not, we just want the object to display
                rel_instance, _ = hydrate(db, rel_model, child_criteria)
                
                # Attach to parent in memory (for Pydantic serialization)
                setattr(obj, rel_name, rel_instance)
                
    return obj
