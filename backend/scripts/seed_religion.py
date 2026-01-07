import os
import sys

# Add backend directory to sys.path to find app module
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..')
sys.path.append(backend_dir)

from app.database import SessionLocal
from app.models.religion import Religion

def load_religion_data():
    txt_path = os.path.join(backend_dir, 'data', 'religion', 'religion.txt')
    try:
        with open(txt_path, 'r', encoding='utf-8') as f:
            # Read lines and strip whitespace
            lines = [line.strip() for line in f if line.strip()]
        return lines
    except FileNotFoundError:
        # Fallback for manual running from different directories or if file moved
        # Try local path if running from root relative to scripts? 
        # Actually proper path construction above should work if structure is consistent.
        # But let's print the error clearly if fails.
        raise FileNotFoundError(f"Could not find data file at: {txt_path}")

def seed_religion_data():
    db = SessionLocal()
    
    try:
        religion_names = load_religion_data()
        print(f"Loaded {len(religion_names)} religion names from file.")
    except Exception as e:
        print(f"Error reading data file: {e}")
        return

    try:
        count_added = 0
        for name in religion_names:
            # Check if exists
            exists = db.query(Religion).filter_by(name_vi=name).first()
            if not exists:
                new_religion = Religion(name_vi=name, name_en=None)
                db.add(new_religion)
                count_added += 1
                # print(f"  + Added: {name}") 
        
        db.commit()
        print(f"[DONE] Finished seeding! Added {count_added} new religions.")
        
    except Exception as e:
        print(f"[ERROR] Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_religion_data()
