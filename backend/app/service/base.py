from sqlalchemy.orm import Session
from app.models.base import Base

def generic_update(db: Session, db_obj: Base, update_data: dict):
    """
    Generic Factory for updating SQLAlchemy models.
    Auto-filters sensitive fields and triggers audit logs via session commit.
    """
    if not db_obj:
        return None

    sensitive_fields = {"id", "created_at", "updated_at", "identity_id"}
    has_changes = False

    for key, value in update_data.items():
        # Security: Skip sensitive fields
        if key in sensitive_fields:
            continue
            
        # Dynamically set attribute if it exists on the model
        if hasattr(db_obj, key):
            current_val = getattr(db_obj, key)
            if current_val != value:
                setattr(db_obj, key, value)
                has_changes = True
    
    if has_changes:
        db.add(db_obj)
        db.commit() # Triggers flush -> SQLAlchemy events -> Audit Log
        db.refresh(db_obj)
        
    return db_obj

# Helper function examples (One-liners as requested)
def update_identity(db: Session, obj: Base, data: dict): return generic_update(db, obj, data)
def update_address(db: Session, obj: Base, data: dict): return generic_update(db, obj, data)
def update_guardian(db: Session, obj: Base, data: dict): return generic_update(db, obj, data)
