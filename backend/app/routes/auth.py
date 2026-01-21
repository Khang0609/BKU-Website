from fastapi import APIRouter, HTTPException, status, Response, Request, Depends
from app.database import get_db
from app.models import User, UserRole, Identity, GeneralInformation
from app.constants import Status
import app.schemas.schemas as schemas
import app.auth as auth
from sqlalchemy.orm import Session, joinedload, load_only
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Authentication"])

router.get("/", response_model=schemas.UserResponse)

# --- Dependencies ---
def get_current_user(token: str = Depends(auth.oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except auth.JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# --- Routes ---

@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_identity = Identity(role=user.role)
    db.add(db_identity)
    db.flush() # Flush to get db_identity.id
    
    db_general_info = GeneralInformation(identity_id=db_identity.id)
    db.add(db_general_info)

    hashed_password = auth.get_password_hash(user.password)
    db_user = User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password,
        identity_id=db_identity.id,
        is_active=user.is_active
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=schemas.Token)
def login(response: Response, user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).options(
        joinedload(User.identity)
        .load_only(Identity.role)
        .joinedload(Identity.general_information)
        .load_only(GeneralInformation.last_name, GeneralInformation.first_name)
    ).filter(User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not auth.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate tokens
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.identity.role, "id": user.identity.id}, expires_delta=access_token_expires
    )
    
    refresh_token_expires = timedelta(minutes=auth.REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = auth.create_refresh_token(
        data={"sub": user.email, "id": user.identity.id}, expires_delta=refresh_token_expires
    )

    # Set Refresh Token in HttpOnly Cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True, # Should be True in production
        samesite="lax",
        max_age=auth.REFRESH_TOKEN_EXPIRE_MINUTES * 60
    )

    general_info = user.identity.general_information
    full_name_str = "Unknown"
    if general_info:
        last = general_info.last_name or ""
        first = general_info.first_name or ""
        full_name_str = f"{last} {first}".strip()

    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "role": user.identity.role,
        "full_name": full_name_str
    }

@router.post("/refresh")
def refresh_token(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )
    
    try:
        payload = auth.jwt.decode(refresh_token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        
        # Check if user exists and is active
        user = db.query(User).options(joinedload(User.identity).joinedload(Identity.general_information)).filter(User.email == email).first()
        if user is None or not user.is_active:
             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found or inactive")

        # Create new access token
        access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = auth.create_access_token(
            data={"sub": user.email, "role": user.identity.role, "id": user.identity.id}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}

    except auth.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

# Include the /users/me endpoint here as it relates strictly to the current authenticated session
@router.get("/users/me", response_model=schemas.UserResponse)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user