import json
from datetime import datetime, date
from sqlalchemy import event, inspect, insert
from enum import Enum

from app.models.base import Base
from app.models.audit_log import AuditLog
from app.context import request_user_context

def json_serializer(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, Enum):
        return obj.value
    # Fallback to string for unknown types to prevent crash
    return str(obj)

def to_serializable(val):
    """Helper to ensure data is JSON serializable before passing to SQLAlchemy JSON column"""
    if val is None: return None
    return json.loads(json.dumps(val, default=json_serializer))

def save_audit(connection, target, action, old_vals=None, new_vals=None):
    # Avoid recursion
    if target.__tablename__ == 'audit_logs':
        return

    user_id = request_user_context.get()
    if not user_id:
        user_id = 1 # Default to System/Admin

    try:
        # Determine Subject Identity ID (target_id is now FK to Identity)
        subject_id = None
        if hasattr(target, 'identity_id'):
            subject_id = target.identity_id
        elif target.__tablename__ == 'identities':
            subject_id = getattr(target, 'id', None)
        
        # If we can't link this change to an Identity, skipping audit (or handle differently)
        # Because target_id is nullable=False and FK to identities.
        if subject_id is None:
            return

        stmt = insert(AuditLog).values(
            actor_id=user_id,
            target_type=target.__tablename__,
            target_id=subject_id,
            action=action,
            old_values=to_serializable(old_vals),
            new_values=to_serializable(new_vals)
        )
        connection.execute(stmt)
    except Exception as e:
        print(f"Error saving audit log: {e}")

@event.listens_for(Base, 'after_insert', propagate=True)
def after_insert(mapper, connection, target):
    try:
        new_vals = {
            c.key: getattr(target, c.key) 
            for c in mapper.column_attrs 
            if getattr(target, c.key) is not None
        }
        save_audit(connection, target, 'CREATE', new_vals=new_vals)
    except Exception:
        pass

@event.listens_for(Base, 'before_update', propagate=True)
def before_update(mapper, connection, target):
    try:
        state = inspect(target)
        old_vals = {}
        new_vals = {}
        
        for attr in state.attrs:
            hist = attr.history
            if hist.has_changes():
                old = hist.deleted[0] if hist.deleted else None
                new = hist.added[0] if hist.added else None
                
                # Filter out irrelevant changes (like None -> None or Equal values)
                if old != new:
                    old_vals[attr.key] = old
                    new_vals[attr.key] = new
                    
        if old_vals or new_vals:
            save_audit(connection, target, 'UPDATE', old_vals=old_vals, new_vals=new_vals)
    except Exception:
        pass

@event.listens_for(Base, 'after_delete', propagate=True)
def after_delete(mapper, connection, target):
    try:
        old_vals = {
            c.key: getattr(target, c.key) 
            for c in mapper.column_attrs
        }
        save_audit(connection, target, 'DELETE', old_vals=old_vals)
    except Exception:
        pass

def register_listeners():
    # Just importing this module triggers the decorators
    pass
