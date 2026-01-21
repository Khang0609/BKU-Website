from contextvars import ContextVar
from typing import Optional

# Context variable to store the current user ID for the request
# Defaults to None
request_user_context: ContextVar[Optional[int]] = ContextVar("request_user_context", default=None)
