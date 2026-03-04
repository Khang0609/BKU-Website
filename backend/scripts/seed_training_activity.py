import sys
import os
import random
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.auth import Identity
from app.constants import UserRole
from app.models.profile.student.training_point import StudentTrainingPoint
from app.models.adminstrative.extra_curricular import ExtraCurricular, ExtraCurricularState
from app.models.profile.student.extra_curricular import StudentExtraCurricular

def seed_training_activity_data():
    db = SessionLocal()
    try:
        # 1. Fetch all student identities
        students = db.query(Identity).filter(Identity.role == UserRole.STUDENT).all()
        if not students:
            print("[WARN] No students found to seed training points/activities.")
            return

        print(f"[INFO] Seeding data for {len(students)} students...")

        # 2. Create Global Extra-Curricular Activities if they don't exist
        activities_data = [
            {
                "id": "ACT001",
                "name": "Social Work: Green Summer Campaign 2024",
                "address": "Ben Tre Province",
                "day_start": "2024-07-01",
                "duration_days": 30,
                "has_proof": True,
                "state": ExtraCurricularState.END
            },
            {
                "id": "ACT002",
                "name": "Technical Workshop: AI & Future",
                "address": "Building B6, HCMUT",
                "day_start": "2024-03-15",
                "duration_days": 1,
                "has_proof": True,
                "state": ExtraCurricularState.END
            }
        ]

        activities = []
        for act_data in activities_data:
            existing_act = db.query(ExtraCurricular).filter(ExtraCurricular.id == act_data["id"]).first()
            if not existing_act:
                new_act = ExtraCurricular(**act_data)
                db.add(new_act)
                activities.append(new_act)
                print(f"[OK] Created Activity: {act_data['name']}")
            else:
                activities.append(existing_act)

        db.flush()

        # 3. Seed student records
        for student in students:
            # Training Points (all get 90)
            existing_tp = db.query(StudentTrainingPoint).filter(
                StudentTrainingPoint.identity_id == student.id,
                StudentTrainingPoint.semester == "2023.2"
            ).first()
            
            if not existing_tp:
                new_tp = StudentTrainingPoint(
                    identity_id=student.id,
                    semester="2023.2",
                    points=90,
                    rating="Xuất sắc",
                    updated_at=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                )
                db.add(new_tp)

            # Extra-Curriculars (randomly 1 or 2)
            num_activities = random.randint(1, 2)
            selected_activities = random.sample(activities, num_activities)

            for act in selected_activities:
                existing_sec = db.query(StudentExtraCurricular).filter(
                    StudentExtraCurricular.identity_id == student.id,
                    StudentExtraCurricular.extra_curricular_id == act.id
                ).first()

                if not existing_sec:
                    # Automatically update social_work_days_exchange if is_verified is true
                    # is_verified = random.choice([True, False])
                    # user said: update automatically as the number of day to execute if is vertification is true
                    is_verified = True # Let's make it true for demonstration
                    exchange_days = act.duration_days if is_verified else 0
                    
                    new_sec = StudentExtraCurricular(
                        identity_id=student.id,
                        extra_curricular_id=act.id,
                        social_work_days_exchange=exchange_days,
                        is_verified=is_verified
                    )
                    db.add(new_sec)

        db.commit()
        print("[DONE] Training points and extra-curricular activities seeded.")
    except Exception as e:
        print(f"[ERROR] Seeding failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_training_activity_data()
