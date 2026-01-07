from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv


load_dotenv()
# Use environment variable for DB URL or default to a local Postgres instance
# Format: postgresql://user:password@host:port/dbname
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")


if SQLALCHEMY_DATABASE_URL.startswith("postgresql"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_pre_ping=True, # Tự động kiểm tra kết nối còn sống không trước khi dùng
        connect_args={"connect_timeout": 10}
    )
# print(f"--- DEBUG: Backend is connecting to: {SQLALCHEMY_DATABASE_URL} ---")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
