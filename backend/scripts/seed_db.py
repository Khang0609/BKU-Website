import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__)) # Add current dir for local imports

from app.database import SessionLocal, engine
from app.models.base import Base 
from app.models.auth import User, Identity
from app.constants import UserRole

# Import the new generator function
from scripts.genarate_data import generate_general_info

from app.auth import get_password_hash # Changed from create_access_token, we need access to password hash function
# If get_password_hash is not in auth, I will assume it's where create_access_token is or similar. 
# Checking imports from previous reads, crud.py used get_password_hash from app.auth.

from utils.utils import split_vietnamese_name

from seed_province import seed_administrative_data
from seed_academic import seed_academic_data
from seed_ethnic import seed_ethnic_data
from seed_religion import seed_religion_data
from seed_student import seed_student_data
from seed_country import seed_country_data
from seed_decision import seed_decision_data

import subprocess

def run_migrations():
    """Run alembic migrations to create tables."""
    print("[INFO] Running database migrations...")
    try:
        # Run alembic upgrade head from the backend directory
        subprocess.run(["alembic", "upgrade", "head"], check=True, cwd=os.path.join(os.path.dirname(__file__), '..'))
        print("[OK] Database migrations completed.")
    except Exception as e:
        print(f"[ERROR] Failed to run migrations: {e}")
        # Fallback to create_all if alembic fails
        print("[INFO] Attempting to create tables using SQLAlchemy create_all...")
        Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # Password for all accounts
    hashed_password = get_password_hash("password123")
    
    # Helper to create account
    def create_account(email, full_name, role: UserRole):
        # 1. Check if user exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return existing_user

        try:
            # 2. Create Identity (Minimal fields: id, role)
            identity = Identity(role=role)
            db.add(identity)
            db.flush() # get ID

            # 3. Create User (Minimal fields: email, hash, is_active, identity_id)
            user = User(
                email=email,
                hashed_password=hashed_password,
                is_active=True,
                identity_id=identity.id
            )
            db.add(user)
            db.flush()
            
            # 4. Generate General Info
            generate_general_info(db, identity.id, full_name, email)
            
            db.commit()
            print(f"[OK] Created {role.value}: {email}")
            return user
        except Exception as e:
            print(f"[ERROR] Failed to create {role.value} {email}: {e}")
            db.rollback()
            return None

    # --- 1. Seed Admin (1 account) ---
    admins_data = [
        {"name": "Trần Xuân Đãng", "email": "admin@hcmut.edu.vn"}
    ]
    for admin in admins_data:
        create_account(admin["email"], admin["name"], UserRole.ADMIN)

    # --- 2. Seed Lecturers (2 accounts) ---
    lecturers_data = [
        {"name": "Dr. Lecturer A", "email": "lecturer1@hcmut.edu.vn"},
        {"name": "Dr. Lecturer B", "email": "lecturer2@hcmut.edu.vn"},
    ]
    for lec in lecturers_data:
        create_account(lec["email"], lec["name"], UserRole.LECTURER)

    # --- 3. Seed Office (2 accounts) ---
    office_data = [
        {"name": "Ms. Office A", "email": "office1@hcmut.edu.vn"},
        {"name": "Mr. Office B", "email": "office2@hcmut.edu.vn"},
    ]
    for off in office_data:
        create_account(off["email"], off["name"], UserRole.OFFICE)

    # --- 4. Seed Students (5 accounts) ---
    students_data = [
        {"id": "2550001", "name": "Nguyễn Văn A"},
        {"id": "2550002", "name": "Trần Thị B"},
        {"id": "2550003", "name": "Lê Văn C"},
        {"id": "2550004", "name": "Phạm Thị D"},
        {"id": "2550005", "name": "Hoàng Văn E"},
    ]
    for student in students_data:
        email = f"student{student['id']}@hcmut.edu.vn"
        create_account(email, student["name"], UserRole.STUDENT)

    db.close()
    print("\n[DONE] Seeding completed successfully!")

if __name__ == "__main__":
    run_migrations()
    
    # 1. Seed Reference Data
    seed_administrative_data()
    seed_academic_data()
    seed_ethnic_data()
    seed_religion_data()
    seed_country_data()
    seed_decision_data()
    
    # 2. Seed Users & Identities (depends on reference data)
    seed()
    
    # 3. Seed Student Details (depends on users)
    seed_student_data()
