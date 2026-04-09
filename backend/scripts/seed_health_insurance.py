import sys
import os
import logging

# Add the backend directory to sys.path to resolve imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.profile.student import StudentRoleAnchor
from app.models.profile.shared import HealthInsurance

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_health_insurance():
    db = SessionLocal()
    try:
        logger.info("--- Seeding Generic Health Insurance for Nguyễn Văn A ---")
        
        # Find the student anchor for "2550001" to get the identity_id
        anchor = db.query(StudentRoleAnchor).filter(StudentRoleAnchor.student_code == "2550001").first()
        
        if not anchor:
            logger.error("Student 2550001 not found in student_role_anchors. Please run seed_student.py first.")
            return

        identity_id = anchor.identity_id

        # Check if insurance already exists
        insurance = db.query(HealthInsurance).filter(HealthInsurance.identity_id == identity_id).first()
        
        if not insurance:
            insurance = HealthInsurance(
                identity_id=identity_id,
                medical_book_number="SKB-2550001",
                health_insurance_number="GD-2550001",
                accident_insurance_number="TN-2550001"
            )
            db.add(insurance)
            db.commit()
            logger.info(f"Added generic health insurance for Identity ID: {identity_id} (Student 2550001)")
        else:
            logger.info(f"Health insurance already exists for Identity ID: {identity_id}")
            
    except Exception as e:
        logger.error(f"Seeding Failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_health_insurance()
