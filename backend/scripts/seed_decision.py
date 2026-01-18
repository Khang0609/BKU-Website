import sys
import os
from datetime import datetime

# Add parent directory to path to allow imports from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy.orm import Session
from sqlalchemy import insert, select
from app.database import SessionLocal
from app.models.auth import User, UserRole
from app.models.adminstrative.decision import Decision, DecisionType
from app.models.profile.student.decision import StudentDecision

def seed_decision_data():
    db = SessionLocal()
    try:
        print("[INFO] Starting decision seeding...")

        # --- Step 1: Create Global Decisions ---
        
        # Define the 2 decisions
        decisions_data = [
            {
                "semester": "HK2 2024-2025",
                "decision_reason": "Khen thưởng Sinh viên Xuất sắc",
                "decision_number": "1001/QĐ-BK-CTSV",
                "decision_content": "Quyết định khen thưởng cho toàn thể sinh viên có thành tích học tập tốt",
                "signed_date": datetime.now().strftime("%d/%m/%Y"),
                "last_updated": datetime.now().strftime("%d/%m/%Y"),
                "decision_type": DecisionType.OTHER
            },
            {
                "semester": "HK2 2024-2025",
                "decision_reason": "Thông báo Nghỉ lễ",
                "decision_number": "1002/TB-BK-HC",
                "decision_content": "Thông báo về lịch nghỉ lễ sắp tới cho toàn trường",
                "signed_date": datetime.now().strftime("%d/%m/%Y"),
                "last_updated": datetime.now().strftime("%d/%m/%Y"),
                "decision_type": DecisionType.OTHER
            }
        ]

        created_decisions = []
        
        for data in decisions_data:
            # Check if decision exists by decision_number
            decision = db.query(Decision).filter(Decision.decision_number == data["decision_number"]).first()
            if not decision:
                decision = Decision(**data)
                db.add(decision)
                db.commit()
                db.refresh(decision)
                print(f"[OK] Created Decision: {data['decision_reason']} ({data['decision_number']})")
            else:
                print(f"[INFO] Decision already exists: {data['decision_reason']} ({data['decision_number']})")
            
            created_decisions.append(decision)

        # --- Step 2: Link to All Students ---

        # Fetch all student identity IDs
        # We query Users who are STUDENTs and have an identity_id
        student_query = db.query(User.identity_id).filter(
            User.role == UserRole.STUDENT,
            User.identity_id.isnot(None)
        )
        student_ids = [row[0] for row in student_query.all()]
        
        if not student_ids:
            print("[WARN] No students found to seed decisions for.")
            return

        print(f"[INFO] Found {len(student_ids)} students. Preparing to link decisions...")

        # Prepare mappings for bulk insert
        student_decision_mappings = []
        
        # To prevent duplicates in a bulk way, we can check existing pairs
        # Get all existing (identity_id, decision_id) tuples
        decision_ids = [d.id for d in created_decisions]
        
        existing_links_query = db.query(StudentDecision.identity_id, StudentDecision.decision_id).filter(
            StudentDecision.decision_id.in_(decision_ids)
        )
        existing_links = set((row[0], row[1]) for row in existing_links_query.all())

        count_new = 0
        for s_id in student_ids:
            for decision in created_decisions:
                if (s_id, decision.id) not in existing_links:
                    student_decision_mappings.append({
                        "identity_id": s_id,
                        "decision_id": decision.id,
                        "note": None
                    })
                    count_new += 1

        if student_decision_mappings:
            # Use bulk_insert_mappings for performance
            # In SQLAlchemy 2.0 this might emit warnings but is still widely supported or use corresponding Insert construct
            # For pure simple mapping insert:
            db.bulk_insert_mappings(StudentDecision, student_decision_mappings)
            db.commit()
            print(f"[SUCCESS] Successfully linked {len(student_ids)} students to decisions. ({count_new} new records created)")
        else:
            print("[INFO] All students already have these decisions linked.")

    except Exception as e:
        print(f"[ERROR] An error occurred during decision seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_decision_data()
