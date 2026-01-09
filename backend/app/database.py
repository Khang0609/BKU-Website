from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Use environment variable for DB URL
# Format: postgresql://user:password@host:port/dbname
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    # Fallback or robust error handling as requested
    # In a real production app, you might want to log this or fallback to a default for dev
    # For this task, raising a clear error is "robust error handling" if it's missing.
    # Alternatively, providing a default for local dev if acceptable. 
    # The user asked for "fallback OR error handling". 
    # I will provide a clear error message as it's safer than a silent fallback to a wrong DB.
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=20,           # Maintain 20 permanent connections
    max_overflow=80,        # Allow up to 80 temp connections (total 100)
    pool_timeout=30,        # Wait 30s for a slot
    pool_recycle=1800,      # Recycle connections every 30 mins
    pool_pre_ping=True      # Check connection health before use
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Dependency that creates a new SQLAlchemy session for a request 
    and closes it when the request is finished.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
