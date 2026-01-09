import sys
import os
import random
import logging
from datetime import date, timedelta
from faker import Faker
from sqlalchemy.exc import IntegrityError

# Add the backend directory to sys.path to resolve imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.auth import Identity, User
from app.models.profile.student import StudentAcademic, StudentPersonal, StudentAddress, StudentParent, StudentGuardian
from app.models.profile.student.address import AddressType
from app.models.ethnic import Ethnic
from app.constants import Gender, Status, PriorityArea, PriorityGroup

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

fake = Faker('vi_VN')

def get_ethnic_name(db, ethnic_id):
    ethnic = db.query(Ethnic).filter(Ethnic.id == ethnic_id).first()
    if ethnic:
        return ethnic.name_vi
    return "Kinh" if ethnic_id == 1 else "Hoa"

def create_specific_student_profile(db, raw_student_id, full_name, user_email):
    # raw_student_id: e.g. "2550001"
    
    # Check if User exists to find Identity
    user = db.query(User).filter(User.email == user_email).first()
    
    if not user or not user.identity:
        logger.warning(f"User/Identity for {user_email} not found. Skipping profile creation. Run seed_db.py first.")
        return

    identity = user.identity
    identity_id = identity.id
    logger.info(f"Seeding profile for {full_name} (Identity ID: {identity_id})...")

    # Update Identity details if needed (seed_db only sets name and status)
    if not identity.date_of_birth:
        identity.date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=25)
        identity.gender = random.choice(list(Gender))
        identity.identity_card = fake.ssn()
        identity.date_created = date.today()
        identity.place_created = fake.city()
        identity.place_of_birth = fake.city()
        identity.nationality = "Vietnam"
        db.add(identity)
        db.flush()

    # Check if StudentAcademic exists
    existing_academic = db.query(StudentAcademic).filter(StudentAcademic.identity_id == identity_id).first()
    if not existing_academic:
        # 2. Student Academic
        academic = StudentAcademic(
            identity_id=identity_id,
            student_code=raw_student_id, # "255xxxx" as STR, NO PREFIX
            class_code=f"CC{str(date.today().year)[2:]}KTM{random.randint(1,5)}",
            
            major_id=random.choice([1, 2, 3, 4, 5]),
            unit_id=random.choice([1, 2]),
            
            enrollment_date=date(2025, 8, 15),
            curriculum_year=2025,
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
    
    # Check if StudentPersonal exists
    existing_personal = db.query(StudentPersonal).filter(StudentPersonal.identity_id == identity_id).first()
    if not existing_personal:
        # 3. Student Personal
        eth_id = random.choice([1, 2])
        
        # Split name securely
        parts = identity.full_name.split()
        if len(parts) > 1:
            lname = " ".join(parts[:-1])
            fname = parts[-1]
        else:
            lname = ""
            fname = parts[0]

        personal = StudentPersonal(
            identity_id=identity_id,
            last_name=lname,
            first_name=fname,
            avatar_url=f"https://i.pravatar.cc/150?u={raw_student_id}",
            
            date_of_birth=identity.date_of_birth,
            gender=identity.gender,
            
            id_card_number=identity.identity_card,
            id_card_date=fake.date_between(start_date='-5y', end_date='today'),
            id_card_place=identity.place_created,
            
            phone=fake.phone_number(),
            student_email=user_email,
            personal_email=fake.email(),
            family_phone=fake.phone_number(), # Added new field
            dorm_room=f"H{random.randint(1,6)}-{random.randint(100,500)}", # Added new field
            
            nationality="Vietnam",
            place_of_birth=identity.place_of_birth,
            ethnic_id=eth_id,
            religion_id=random.choice([1, 2]),
            priority_area=random.choice(list(PriorityArea)), # Updated to Enum
            priority_group=random.choice(list(PriorityGroup)), # Updated to Enum
            
            union_date=fake.date_between(start_date='-5y', end_date='today'), # Added new field
        )
        db.add(personal)
        db.flush() 

        # 3a. Student Parent
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
        
        # 3b. Guardian
        if random.choice([True, False]):
            guardian = StudentGuardian(
                identity_id=identity_id,
                full_name=fake.name(),
                relationship_to_student=random.choice(["Uncle", "Aunt", "Grandparent"]),
                phone_number=fake.phone_number(),
                job=fake.job(),
                email=fake.email(),
                citizen_id=fake.ssn(),
                
                # New Address Fields
                province_id=random.randint(1, 10),
                ward_id=random.choice([10, 25, 40, 55]),
                house_number=fake.building_number(),
                address=fake.address(),
                
                is_emergency_contact=True
            )
            db.add(guardian)

        # 4. Student Address
        # Permanent
        perm_address = StudentAddress(
            identity_id=identity_id,
            address_type=AddressType.PERMANENT,
            province_id=random.randint(1, 10),
            ward_id=random.choice([10, 25, 40, 55]),
            street=fake.street_name(),
            house_number=fake.building_number()
        )
        db.add(perm_address)
        
        # Current
        curr_address = StudentAddress(
            identity_id=identity_id,
            address_type=AddressType.CURRENT,
            province_id=random.randint(1, 10),
            ward_id=random.choice([10, 25, 40, 55]),
            street=fake.street_name(),
            house_number=fake.building_number()
        )
        db.add(curr_address)

def seed_student_data():
    db = SessionLocal()
    try:
        logger.info("--- Starting Student Profile Seeding ---")
        
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
