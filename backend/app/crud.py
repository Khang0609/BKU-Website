from sqlalchemy.orm import Session
from app.models import User, Identity, UserRole
from app.constants import Status
from app.auth import get_password_hash

def create_student_account(db: Session, email: str, password: str, raw_id: str, first_name: str = "Trần Nguyên", last_name: str = "Khang"):
    # 1. Create Identity (ID Auto Increment)
    new_identity = Identity(
        full_name=full_name,
        status=Status.ACTIVE
    )
    db.add(new_identity)
    db.flush() # Flush to get new_identity.id
    
    # 2. Link User
    new_user = User(
        email=email,
        full_name=new_identity.full_name,
        hashed_password=get_password_hash(password),
        role=UserRole.STUDENT,
        identity_id=new_identity.id
    )
    db.add(new_user)
    
    db.commit()
    db.refresh(new_user)
    return new_user

def create_teacher_account(db: Session, email: str, password: str, raw_id: str, first_name: str = "Trần Nguyên", last_name: str = "Khang"):
    # 1. Create Identity
    new_identity = Identity(
        full_name=full_name,
        status=Status.ACTIVE
    )
    db.add(new_identity)
    db.flush()
    
    # 2. Link User
    new_user = User(
        email=email,
        full_name=new_identity.full_name,
        hashed_password=get_password_hash(password),
        role=UserRole.LECTURER,
        identity_id=new_identity.id
    )
    db.add(new_user)
    
    db.commit()
    db.refresh(new_user)
    return new_user

def create_admin_account(db: Session, email: str, password: str, raw_id: str, full_name: str = "Quản trị viên"):
    # 1. Create Identity
    new_identity = Identity(
        full_name=full_name,
        status=Status.ACTIVE
    )
    db.add(new_identity)
    db.flush()
    
    # 2. Link User
    new_user = User(
        email=email,
        full_name=new_identity.full_name,
        hashed_password=get_password_hash(password),
        role=UserRole.ADMIN,
        identity_id=new_identity.id
    )
    db.add(new_user)
    
    db.commit()
    db.refresh(new_user)
    return new_user

def create_office_account(db: Session, email: str, password: str, raw_id: str, full_name: str = "Nhân viên văn phòng"):
    # 1. Create Identity
    new_identity = Identity(
        full_name=full_name,
        status=Status.ACTIVE
    )
    db.add(new_identity)
    db.flush()
    
    # 2. Link User
    new_user = User(
        email=email,
        full_name=new_identity.full_name,
        hashed_password=get_password_hash(password),
        role=UserRole.OFFICE,
        identity_id=new_identity.id
    )
    db.add(new_user)
    
    db.commit()
    db.refresh(new_user)
    return new_user