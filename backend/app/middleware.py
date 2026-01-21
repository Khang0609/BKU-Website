from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from app.context import request_user_context
from app.auth import SECRET_KEY, ALGORITHM
from jose import jwt

class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Reset context at start of request
        token = request.headers.get("Authorization")
        user_id = None
        
        if token and token.startswith("Bearer "):
            token_str = token.split(" ")[1]
            try:
                payload = jwt.decode(token_str, SECRET_KEY, algorithms=[ALGORITHM])
                user_id = payload.get("id")
            except Exception:
                pass # Invalid token, ignore
        
        # Set context
        token_ctx = request_user_context.set(user_id)
        
        try:
            response = await call_next(request)
            return response
        finally:
            # Reset context
            request_user_context.reset(token_ctx)
