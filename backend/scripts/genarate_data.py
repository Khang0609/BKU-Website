
import random
from datetime import date
from faker import Faker
from sqlalchemy.orm import Session
from app.models.profile.shared.general_information import GeneralInformation
from app.models.location import Country
from app.constants import Gender, Status
from utils.utils import split_vietnamese_name

fake = Faker('vi_VN')

def generate_general_info(db: Session, identity_id: int, full_name: str, email: str = None) -> GeneralInformation:
    """
    Auto-generates full General Information for a given Identity ID.
    """
    
    # Check if already exists
    existing = db.query(GeneralInformation).filter(GeneralInformation.identity_id == identity_id).first()
    if existing:
        return existing

    # Find Vietnam for default nationality
    vietnam = db.query(Country).filter(Country.name.ilike("Vietnam%")).first()
    vietnam_id = vietnam.id if vietnam else 1 # Fallback to 1 if not found

    last_name, first_name = split_vietnamese_name(full_name)
    
    # Determine gender randomly or based on name hints if possible (simplified here)
    gender = random.choice(list(Gender))

    gen_info = GeneralInformation(
        identity_id=identity_id,
        first_name=first_name,
        last_name=last_name,
        avatar_url=f"https://ui-avatars.com/api/?name={first_name}+{last_name}&background=random",
        date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=60),
        gender=gender,
        
        # ID Card
        id_card_number=fake.ssn(),
        id_card_date=fake.date_between(start_date='-10y', end_date='today'),
        id_card_place=fake.city(),
        
        # Contact
        phone=fake.phone_number(),
        personal_email=email, # Use the user's email if provided
        backup_email=fake.email(),
        
        # Places
        nationality_id=vietnam_id,
        place_of_birth=fake.city(),
        other_place_of_birth="None",
        
        # Relations (Randomly assign generic IDs 1 or 2 if they exist, or leave None)
        # Assuming ethnicities and religions are seeded 1..N
        ethnic_id=random.randint(1, 2), 
        religion_id=random.randint(1, 2), 
        
        status=Status.ACTIVE
    )
    
    db.add(gen_info)
    db.commit()
    db.refresh(gen_info)
    return gen_info
