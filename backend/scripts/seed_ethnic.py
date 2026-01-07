import os
import sys

# Add backend directory to sys.path to find app module
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..')
sys.path.append(backend_dir)

from app.database import SessionLocal
from app.models import Ethnic

def load_ethnic_data():
    txt_path = os.path.join(backend_dir, 'data', 'ethnic', 'ethnic.txt')
    with open(txt_path, 'r', encoding='utf-8') as f:
        # Read lines and strip whitespace
        lines = [line.strip() for line in f if line.strip()]
    return lines

def seed_ethnic_data():
    db = SessionLocal()
    
    try:
        ethnic_names = load_ethnic_data()
        print(f"Loaded {len(ethnic_names)} ethnic names from file.")
    except Exception as e:
        print(f"Error reading data file: {e}")
        return

    try:
        count_added = 0
        for name in ethnic_names:
            # Check if exists
            exists = db.query(Ethnic).filter_by(name_vi=name).first()
            if not exists:
                new_ethnic = Ethnic(name_vi=name, name_en=None)
                db.add(new_ethnic)
                count_added += 1
                # print(f"  + Added: {name}") 
        
        db.commit()
        print(f"[DONE] Finished seeding! Added {count_added} new ethnic groups.")
        
    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_ethnic_data()
