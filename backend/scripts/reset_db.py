import sys
import os
from sqlalchemy import text
import logging

# Add the backend directory to sys.path to resolve imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def reset_db():
    logger.info("--- Resetting Database ---")
    try:
        with engine.connect() as conn:
            conn.execute(text("TRUNCATE users, identities CASCADE;"))
            # The CASCADE on identities should clear all linked profile tables if Foreign Keys are set up with ON DELETE CASCADE.
            # If not, we list them explicitly to be safe:
            conn.execute(text("""
                TRUNCATE TABLE 
                    users, 
                    identities, 
                    general_informations, 
                    student_academics, 
                    student_personals, 
                    student_addresses, 
                    student_parents, 
                    student_guardians, 
                    student_decisions
                RESTART IDENTITY CASCADE;
            """))
            conn.commit()
        logger.info("--- Database Reset Successfully ---")
    except Exception as e:
        logger.error(f"Failed to reset database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    reset_db()
