import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__)) # Add current dir for local imports

from app.database import SessionLocal, engine
from app.models.base import Base # Fixed import
from app.models import User
from app.crud import create_student_account, create_admin_account, create_teacher_account, create_office_account
from app.auth import create_access_token

from seed_province import seed_administrative_data
from seed_academic import seed_academic_data
from seed_ethnic import seed_ethnic_data
from seed_religion import seed_religion_data
from seed_student import seed_student_data
from seed_country import seed_country_data

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
        # Fallback to create_all if alembic fails or isn't set up, 
        # though mixing both is risky. prefer erroring out or just create_all
        print("[INFO] Attempting to create tables using SQLAlchemy create_all...")
        Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # --- 1. Seed Admin (1 account) ---
    # ID: AD0001
    admins_data = [
        {"id": "0001", "name": "Super Admin", "email": "admin@hcmut.edu.vn"}
    ]
    
    for admin in admins_data:
        db_user = db.query(User).filter(User.email == admin["email"]).first()
        if not db_user:
            try:
                create_admin_account(
                    db=db,
                    email=admin["email"],
                    password="password123",
                    raw_id=admin["id"],
                    full_name=admin["name"]
                )
                print(f"[OK] Created Admin: {admin['email']} (ID: AD{admin['id']})")
            except Exception as e:
                print(f"[ERROR] Failed to create Admin: {e}")
                db.rollback()
        else:
            print(f"[INFO] Admin already exists: {admin['email']}")

    # --- 2. Seed Lecturers (2 accounts) ---
    # ID: GV1001, GV1002
    lecturers_data = [
        {"id": "1001", "name": "Dr. Lecturer A", "email": "lecturer1@hcmut.edu.vn"},
        {"id": "1002", "name": "Dr. Lecturer B", "email": "lecturer2@hcmut.edu.vn"},
    ]
    
    for lec in lecturers_data:
        db_user = db.query(User).filter(User.email == lec["email"]).first()
        if not db_user:
            try:
                create_teacher_account(
                    db=db,
                    email=lec["email"],
                    password="password123",
                    raw_id=lec["id"],
                    full_name=lec["name"]
                )
                print(f"[OK] Created Lecturer: {lec['email']} (ID: GV{lec['id']})")
            except Exception as e:
                print(f"[ERROR] Failed to create Lecturer: {e}")
                db.rollback()
        else:
            print(f"[INFO] Lecturer already exists: {lec['email']}")

    # --- 3. Seed Office (2 accounts) ---
    # ID: VP9001, VP9002
    office_data = [
        {"id": "9001", "name": "Ms. Office A", "email": "office1@hcmut.edu.vn"},
        {"id": "9002", "name": "Mr. Office B", "email": "office2@hcmut.edu.vn"},
    ]

    for off in office_data:
        db_user = db.query(User).filter(User.email == off["email"]).first()
        if not db_user:
            try:
                create_office_account(
                    db=db,
                    email=off["email"],
                    password="password123",
                    raw_id=off["id"],
                    full_name=off["name"]
                )
                print(f"[OK] Created Office: {off['email']} (ID: VP{off['id']})")
            except Exception as e:
                print(f"[ERROR] Failed to create Office: {e}")
                db.rollback()
        else:
            print(f"[INFO] Office already exists: {off['email']}")

    # --- 4. Seed Students (5 accounts) ---
    # ID: SV2550001 - SV2550005
    students_data = [
        {"id": "2550001", "name": "Nguyễn Văn A"},
        {"id": "2550002", "name": "Trần Thị B"},
        {"id": "2550003", "name": "Lê Văn C"},
        {"id": "2550004", "name": "Phạm Thị D"},
        {"id": "2550005", "name": "Hoàng Văn E"},
    ]

    for student in students_data:
        email = f"student{student['id']}@hcmut.edu.vn"
        db_student = db.query(User).filter(User.email == email).first()
        if not db_student:
            try:
                create_student_account(
                    db=db,
                    email=email,
                    password="password123",
                    raw_id=student["id"],
                    full_name=student["name"]
                )
                print(f"[OK] Created Student: {email} (ID: SV{student['id']})")
            except Exception as e:
                print(f"[ERROR] Failed to create Student {email}: {e}")
                db.rollback()
        else:
            print(f"[INFO] Student already exists: {email}")

    db.close()
    print("\n[DONE] Seeding completed successfully!")

if __name__ == "__main__":
    run_migrations()
    seed()
    seed_administrative_data()
    seed_academic_data()
    seed_ethnic_data()
    seed_religion_data()
    seed_student_data()
    seed_country_data()
