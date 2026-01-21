from typing import Type, Tuple, Optional, Dict, Any, TypeVar
from sqlalchemy.orm import Session
from app.models.base import Base

T = TypeVar("T", bound=Base)

def hydrate(
    db: Session, 
    model: Type[T], 
    filter_criteria: Dict[str, Any], 
    defaults: Optional[Dict[str, Any]] = None
) -> Tuple[T, bool]:
    """
    Generic Hydrator: Tries to fetch a record from the database using filter_criteria.
    If the record does not exist, it returns a new instance of the model, 
    pre-populated with the filter_criteria and any defaults provided.

    Args:
        db (Session): The database session.
        model (Type[T]): The SQLAlchemy model class.
        filter_criteria (dict): Dictionary of criteria to filter by.
        defaults (dict, optional): Dictionary of default values for new instance creation.

    Returns:
        Tuple[T, bool]: A tuple containing the model instance and a boolean flag (is_new).
                        is_new is True if the instance was created, False if fetched.
    """
    # Try to fetch the existing record
    instance = db.query(model).filter_by(**filter_criteria).first()

    if instance:
        return instance, False

    # If not found, prepare data for new instance
    # Start with defaults if provided, then overlay filter_criteria
    # This ensures that the created object matches the search criteria
    data = defaults.copy() if defaults else {}
    data.update(filter_criteria)

    # Create new instance (not added to session yet)
    instance = model(**data)

    return instance, True
