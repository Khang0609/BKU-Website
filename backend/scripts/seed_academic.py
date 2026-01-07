import json
import os
import sys

# Thêm đường dẫn backend vào sys.path để Python tìm thấy module app
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..')
sys.path.append(backend_dir)

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models

def load_academic_data_from_json():
    json_path = os.path.join(backend_dir, 'data', 'falcuty', 'falcuty.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
    
    simplified_data = {}
    for faculty, majors_list in raw_data.items():
        simplified_data[faculty] = [m['major'] for m in majors_list]
        
    return simplified_data

def seed_academic_data():
    db = SessionLocal()
    
    # Load dữ liệu từ JSON
    try:
        data = load_academic_data_from_json()
        print(f"Đã đọc dữ liệu từ JSON: {len(data)} Khoa.")
    except Exception as e:
        print(f"Không thể đọc file JSON: {e}")
        return

    try:
        for faculty_name, majors in data.items():
            # 1. Tạo hoặc lấy Khoa
            faculty = db.query(models.Faculty).filter_by(name=faculty_name).first()
            if not faculty:
                faculty = models.Faculty(name=faculty_name)
                db.add(faculty)
                db.flush() # Để lấy faculty.id ngay lập tức
                print(f"  + Thêm Khoa mới: {faculty_name}")

            # 2. Tạo các Ngành thuộc Khoa đó
            for major_name in majors:
                exists = db.query(models.Major).filter_by(name=major_name, faculty_id=faculty.id).first()
                if not exists:
                    new_major = models.Major(name=major_name, faculty_id=faculty.id)
                    db.add(new_major)
                    print(f"    - Thêm Ngành: {major_name}")
        
        db.commit()
        print("[DONE] Đã nạp xong danh sách Khoa và Ngành!")

        # 3. Seed ManagementUnit
        units = [
            {"id": 1, "name": "Phòng Đào tạo", "en_name": "Academic Affairs Office"},
            {"id": 2, "name": "Phòng Công tác Sinh viên", "en_name": "Student Affairs Office"}
        ]
        
        for unit_data in units:
            unit = db.query(models.ManagementUnit).filter_by(id=unit_data["id"]).first()
            if not unit:
                unit = models.ManagementUnit(
                    id=unit_data["id"],
                    name=unit_data["name"],
                    en_name=unit_data["en_name"]
                )
                db.add(unit)
                print(f"  + Thêm Đơn vị quản lý: {unit_data['name']}")
        
        db.commit()
        print("[DONE] Đã nạp xong danh sách Đơn vị quản lý!")
    except Exception as e:
        print(f"[ERROR] Lỗi khi seed database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_academic_data()