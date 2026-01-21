from typing import Type, Tuple, Optional, Dict, Any, TypeVar, Set
from sqlalchemy.orm import Session
from app.models.base import Base
from .hydrator import hydrate
from .delta_merger import merge
from .ultis import dispatch_by_prefix, multi_dispatch

T = TypeVar("T", bound=Base)

class CoreEngine:
    """
    Central Core Engine for Orchestrators.
    Combines Hydration and Delta Merging into a unified workflow.
    """
    
    @staticmethod
    def prepare_and_merge(
        db: Session, 
        model: Type[T], 
        filter_criteria: Dict[str, Any], 
        payload: Dict[str, Any],
        defaults: Optional[Dict[str, Any]] = None,
        exclude_fields: Optional[Set[str]] = None
    ) -> Tuple[T, bool, bool]:
        """
        Orchestrates the Fetch/Create -> Merge workflow.
        
        Args:
            db: Database session
            model: SQLAlchemy model
            filter_criteria: Criteria to find or create the object
            payload: Data to update the object with
            defaults: Default values if object is created
            exclude_fields: Fields to exclude from update
            
        Returns:
            Tuple containing:
            - obj (T): The model instance
            - is_new (bool): True if the instance was just created
            - has_changes (bool): True if the merge resulted in changes
        """
        # 1. Hydrate: Get existing or new object
        obj, is_new = hydrate(db, model, filter_criteria, defaults)
        
        # 2. Merge: Apply changes from payload to object
        has_changes = merge(obj, payload, exclude_fields)
        
        return obj, is_new, has_changes
