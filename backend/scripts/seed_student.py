import sys
import os
import random
import logging
from datetime import date
from faker import Faker

# Add the backend directory to sys.path to resolve imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.profile.shared.general_information import GeneralInformation
from app.models.profile.shared.address import Address, AddressType
from app.models.profile.student import StudentAcademic, StudentPersonal, StudentParent, StudentGuardian, StudentDecision
from app.models.auth import User
from app.constants import PriorityArea, PriorityGroup

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

fake = Faker('vi_VN')

def create_specific_student_profile(db, raw_student_id, full_name, user_email):
    # 1. Get User & Identity
    user = db.query(User).filter(User.email == user_email).first()
    if not user or not user.identity:
        logger.warning(f"User {user_email} or Identity not found. Skipping profile seed.")
        return

    identity_id = user.identity.id
    logger.info(f"Seeding student profile for {full_name} (Identity ID: {identity_id})...")

    # NOTE: General Information is now handled by generate_general_info in seed_db.py

    # 2. Student Academic (backend/app/models/profile/student/academic.py)
    academic = db.query(StudentAcademic).filter(StudentAcademic.identity_id == identity_id).first()
    if not academic:
        academic = StudentAcademic(
            identity_id=identity_id,
            student_code=raw_student_id,
            class_code=f"CC{str(date.today().year)[2:]}KTM{random.randint(1,5)}",
            major_id=random.choice([1, 2, 3, 4, 5]),
            unit_id=random.choice([1, 2]),
            enrollment_date=date(2025, 8, 15),
            curriculum_year=2025,
            entry_semester="HK1 2025-2026",
            study_duration_standard="8 HK",
            standard_semesters=8,
            max_semesters=12,
            expected_graduation_date=date(2029, 10, 1),
            max_graduation_date=date(2031, 10, 1),
            education_level="Đại học",
            training_system="Chính quy",
            training_type="Chính tắc",
            program="Chương trình Đại học Dạy và học bằng tiếng Anh",
            campus="ĐHBK Cơ sở 1 - Lý Thường Kiệt, Diên Hồng",
            student_status="Đang học",
            bknet_account=user_email,
            bank_account=fake.iban(),
            bank_name="OCB", 
            ocb_cif=str(random.randint(100000, 999999))
        )
        db.add(academic)

    # 3. Student Personal (backend/app/models/profile/student/personal.py)
    personal = db.query(StudentPersonal).filter(StudentPersonal.identity_id == identity_id).first()
    if not personal:
        personal = StudentPersonal(
            identity_id=identity_id,
            student_email=user_email,
            family_phone=fake.phone_number(),
            dorm_room=f"H{random.randint(1,6)}-{random.randint(100,500)}",
            priority_area=random.choice(list(PriorityArea)),
            priority_group=random.choice(list(PriorityGroup)),
            union_date=fake.date_between(start_date='-5y', end_date='-1y'),
            party_date=None, # Optional
            youth_union_date=fake.date_between(start_date='-5y', end_date='-1y')
        )
        db.add(personal)

    # 4. Address (backend/app/models/profile/shared/address.py)
    # Permanent
    perm_addr = db.query(Address).filter(
        Address.identity_id == identity_id, 
        Address.address_type == AddressType.PERMANENT
    ).first()
    if not perm_addr:
        perm_addr = Address(
            identity_id=identity_id,
            address_type=AddressType.PERMANENT,
            province_id=random.randint(1, 10),
            ward_id=random.choice([10, 25, 40, 55]),
            detail=f"{fake.building_number()} {fake.street_name()}"
        )
        db.add(perm_addr)
    
    # Current
    curr_addr = db.query(Address).filter(
        Address.identity_id == identity_id, 
        Address.address_type == AddressType.CURRENT
    ).first()
    if not curr_addr:
        curr_addr = Address(
            identity_id=identity_id,
            address_type=AddressType.CURRENT,
            province_id=random.randint(1, 10),
            ward_id=random.choice([10, 25, 40, 55]),
            detail=f"{fake.building_number()} {fake.street_name()}"
        )
        db.add(curr_addr)


    # 5. Student Parent (backend/app/models/profile/student/parent.py)
    parent = db.query(StudentParent).filter(StudentParent.identity_id == identity_id).first()
    if not parent:
        parent = StudentParent(
            identity_id=identity_id,
            father_name=fake.name_male(),
            father_birthday=fake.date_of_birth(minimum_age=45, maximum_age=65),
            father_phone=fake.phone_number(),
            father_job=fake.job(),
            father_workplace=fake.company(),
            mother_name=fake.name_female(),
            mother_birthday=fake.date_of_birth(minimum_age=40, maximum_age=60),
            mother_phone=fake.phone_number(),
            mother_job=fake.job(),
            mother_workplace=fake.company()
        )
        db.add(parent)

    # 6. Student Guardian (backend/app/models/profile/student/guardian.py)
    guardian = db.query(StudentGuardian).filter(StudentGuardian.identity_id == identity_id).first()
    if not guardian:
        if random.choice([True, False]): # 50% chance
            guardian = StudentGuardian(
                identity_id=identity_id,
                full_name=fake.name(),
                relationship_to_student=random.choice(["Chú", "Bác", "Ông", "Bà"]),
                phone_number=fake.phone_number(),
                job=fake.job(),
                email=fake.email(),
                citizen_id=fake.ssn(),
                is_emergency_contact=True
            )
            db.add(guardian)
            
            # Seed Guardian Address
            guardian_addr = Address(
                identity_id=identity_id,
                address_type=AddressType.GUARDIAN,
                province_id=random.randint(1, 10),
                ward_id=random.choice([10, 25, 40, 55]),
                detail=f"{fake.building_number()} {fake.street_name()}"
            )
            db.add(guardian_addr)

    # 7. Student Decision (backend/app/models/profile/student/decision.py)
    # Existing decisions are likely ID 1 and 2
    student_decision = db.query(StudentDecision).filter(StudentDecision.identity_id == identity_id).first()
    if not student_decision:
        # Assign 1 or both decisions
        dec_id = random.choice([1, 2])
        student_decision = StudentDecision(
            identity_id=identity_id,
            decision_id=dec_id,
            note="Khen thưởng sinh viên tiêu biểu" if dec_id == 1 else "Nhập học"
        )
        db.add(student_decision)

def seed_student_data():
    db = SessionLocal()
    try:
        logger.info("--- Starting Student Profile Seeding (Extended Data) ---")
        
        students_data = [
            {"id": "2550001", "name": "Nguyễn Văn A"},
            {"id": "2550002", "name": "Trần Thị B"},
            {"id": "2550003", "name": "Lê Văn C"},
            {"id": "2550004", "name": "Phạm Thị D"},
            {"id": "2550005", "name": "Hoàng Văn E"},
        ]
        
        for student in students_data:
            create_specific_student_profile(
                db, 
                student["id"], 
                student["name"], 
                f"student{student['id']}@hcmut.edu.vn"
            )
            
        db.commit()
        logger.info("--- Student Profile Seeding Completed ---")
        
    except Exception as e:
        logger.error(f"Seeding Failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_student_data()
