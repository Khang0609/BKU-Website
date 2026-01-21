from fastapi import FastAPI, Depends, HTTPException, status, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
import app.models as models
from app.database import engine
from app.routes import all_routers  # Import only auth now
from app.routes.auth import get_current_active_user # Import dependency from auth, not user

from dotenv import load_dotenv
import os
load_dotenv()

from app.middleware import AuditMiddleware
from app.service.listener import register_listeners
register_listeners()

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="BKUWeb API")
app.add_middleware(AuditMiddleware)
# app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")
CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    CORS_ORIGIN,
    CORS_ORIGIN + "/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
for router in all_routers:
    app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to BKUWeb API"}

def check_grading_permission(current_user: models.User = Depends(get_current_active_user)):
    if current_user.role not in [models.UserRole.OFFICE, models.UserRole.LECTURER]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access grading")
    return current_user
