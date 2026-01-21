from typing import Dict, Any, Type, List
from app.models.base import Base

def dispatch_by_prefix(payload: Dict[str, Any], prefix: str) -> Dict[str, Any]:
    """
    Extracts and transforms keys starting with a prefix.
    Example: prefix='contact', payload={'contact_phone': '123'} -> {'phone': '123'}
    
    Args:
        payload: Source dictionary
        prefix: Prefix to filter by (without underscore)
        
    Returns:
        Clean dictionary with prefix removed.
    """
    cleaned = {}
    search_prefix = f"{prefix}_"
    
    for key, value in payload.items():
        if key.startswith(search_prefix):
            # Remove prefix and underscore
            clean_key = key[len(search_prefix):]
            cleaned[clean_key] = value
            
    return cleaned

def multi_dispatch(payload: Dict[str, Any], mapping: Dict[str, Type[Base]]) -> Dict[Type[Base], Dict[str, Any]]:
    """
    Dispatches payload to multiple models based on prefixes.
    
    Args:
        payload: Source data
        mapping: Dict of {prefix: ModelClass}
        
    Returns:
        Dict of {ModelClass: filtered_data}
    """
    results = {}
    
    for prefix, model_cls in mapping.items():
        filtered_data = dispatch_by_prefix(payload, prefix)
        if filtered_data:
            results[model_cls] = filtered_data
            
    return results
