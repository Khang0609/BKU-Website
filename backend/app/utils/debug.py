from typing import Dict, Any, Type, Set
from pydantic import BaseModel
import sys

# ANSI color codes
YELLOW = "\033[33m"
RESET = "\033[0m"

def warn_schema_mismatch(raw_data: Dict[str, Any], schema_model: Type[BaseModel], model_name: str = "Schema"):
    """
    Compares raw req.body data against a Pydantic schema to find ignored/unknown fields.
    Prints a yellow warning to specific dropped fields.
    """
    if not raw_data:
        return

    # Gather all valid field names and possible aliases
    valid_keys: Set[str] = set()
    for name, field in schema_model.model_fields.items():
        valid_keys.add(name)
        if field.alias:
            valid_keys.add(field.alias)

    # Check incoming keys
    received_keys = set(raw_data.keys())
    unknown_keys = received_keys - valid_keys

    if unknown_keys:
        print(f"{YELLOW}[WARNING] {model_name} Mismatch! The following fields found in payload but NOT in schema and will be ignored:{RESET}", file=sys.stderr)
        for key in unknown_keys:
            print(f"{YELLOW}  - {key}{RESET}", file=sys.stderr)
        print(f"{YELLOW}Valid fields are: {', '.join(sorted(valid_keys))}{RESET}", file=sys.stderr)
    else:
        # If no unknown keys, but model_dump is empty, it implies keys matched but maybe types were wrong? 
        # (Though Pydantic usually throws 422 for type errors).
        # Or maybe everything is perfect.
        pass
