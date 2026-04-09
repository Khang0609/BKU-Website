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
            
            # Support nested paths using dot notation (e.g., 'a.b.c')
            parts = rel_name.split(".")
            target_obj = obj
            for part in parts[:-1]:
                target_obj = getattr(target_obj, part, None)
                if target_obj is None:
                    break
            
            if target_obj is None:
                continue
                
            last_part = parts[-1]
            
            # Check if relationship is missing (None)
            if getattr(target_obj, last_part) is None:
                
                # Build criteria for child based on parent's values
                # e.g. parent.id -> child.identity_id
                child_criteria = {}
                for child_col, parent_col in fk_map.items():
                    # Support nested parent_col path
                    p_parts = parent_col.split(".")
                    p_target = obj
                    for p_part in p_parts:
                        p_target = getattr(p_target, p_part, None)
                        if p_target is None:
                            break
                    
                    if p_target is not None:
                        child_criteria[child_col] = p_target
                
                # Use Hydrator to get a default instance
                rel_instance, _ = hydrate(db, rel_model, child_criteria)
                
                # Attach to target object in memory
                setattr(target_obj, last_part, rel_instance)
                
    return obj
