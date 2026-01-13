from typing import List, TypeVar, Optional, Any

T = TypeVar("T")

def get_address_by_type(addresses: List[Any], address_type: str) -> Optional[Any]:
    """
    Finds an address with the specified address_type from a list of address objects.
    Assumes objects have an 'address_type' attribute.
    """
    return next((a for a in addresses if a.address_type == address_type), None)

def filter_update_data(data: dict, prefix: str) -> dict:
    """
    Filters a dictionary for keys starting with a prefix, 
    and returns a new dictionary with the prefix stripped.
    """
    return {
        k[len(prefix):]: v 
        for k, v in data.items() 
        if k.startswith(prefix)
    }
