from typing import Any, Dict, Set, Optional

def merge(db_obj: Any, payload: Dict[str, Any], exclude_fields: Optional[Set[str]] = None) -> bool:
    """
    Generic Delta Merger: Merges payload into db_obj, applying changes only if values differ.
    
    Args:
        db_obj (Any): The database object (SQLAlchemy model instance).
        payload (dict): The dictionary of data to update.
        exclude_fields (set, optional): Additional fields to explicitly exclude from update.
        
    Returns:
        bool: True if any changes were applied, False otherwise.
    """
    if not db_obj:
        return False

    # Security: Always exclude internal/immutable fields
    # We include identity_id as it is typically a structural foreign key that shouldn't change via merge
    secure_exclusions = {"id", "created_at", "updated_at", "identity_id"}
    
    exclusions = secure_exclusions
    if exclude_fields:
        exclusions = exclusions.union(exclude_fields)
        
    has_changes = False
    
    for key, value in payload.items():
        # Security check
        if key in exclusions:
            continue
            
        # Model validity check
        if not hasattr(db_obj, key):
            continue
            
        current_value = getattr(db_obj, key)
        
        # Delta Logic: Only update if strictly different
        # This handles None vs Value, Value vs NewValue, etc.
        if current_value != value:
            print(f"DEBUG: merge - Change detected for {key}: '{current_value}' -> '{value}' (Type: {type(current_value)} -> {type(value)})")
            setattr(db_obj, key, value)
            has_changes = True
            
    return has_changes
