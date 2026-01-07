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
            # Drop schema public and recreate it to wipe all data and tables
            conn.execute(text("DROP SCHEMA public CASCADE;"))
            conn.execute(text("CREATE SCHEMA public;"))
            conn.execute(text("GRANT ALL ON SCHEMA public TO postgres;")) # Adjust user if needed, usually owner has access
            conn.execute(text("GRANT ALL ON SCHEMA public TO public;")) 
            conn.commit()
        logger.info("--- Database Reset Successfully ---")
    except Exception as e:
        logger.error(f"Failed to reset database: {e}")
        sys.exit(1)

if __name__ == "__main__":
    reset_db()
