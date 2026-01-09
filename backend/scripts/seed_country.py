import sys
import os

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal
from app.models.location import Country

def seed_country_data():
    """Reads country names from backend/data/country/country.txt and seeds them."""
    db = SessionLocal()
    
    file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'country', 'country.txt')
    
    if not os.path.exists(file_path):
        print(f"[ERROR] Country data file not found at: {file_path}")
        return

    print("[INFO] Seeding Countries...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        count = 0
        skipped = 0
        
        for line in lines:
            line = line.strip()
            if not line or line == '.': # Skip empty lines or trailing dots
                continue
                
            # Standardize: Capitalize/Title Case
            country_name = line.title() 
            
            # Check if exists
            exists = db.query(Country).filter(Country.name == country_name).first()
            if not exists:
                new_country = Country(
                    name=country_name,
                    nationality_name=country_name # Defaulting nationality same as country name for now
                )
                db.add(new_country)
                count += 1
            else:
                skipped += 1
                
        db.commit()
        print(f"[OK] Seeded {count} countries. Skipped {skipped} existing.")
        
    except Exception as e:
        print(f"[ERROR] Failed to seed countries: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_country_data()
