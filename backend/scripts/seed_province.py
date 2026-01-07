import json
import os
from app.database import SessionLocal
import app.models as models

def seed_administrative_data():
    db = SessionLocal()
    # Correct path relative to this script: ../data/map_2025
    json_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'map_2025')
    
    try:
        if not os.path.exists(json_path):
             print(f"[ERROR] Path not found: {json_path}")
             return

        for filename in os.listdir(json_path):
            if filename.endswith(".json"):
                with open(os.path.join(json_path, filename), 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                    # 1. Thêm Tỉnh/Thành phố
                    province_name = data["name"]
                    db_province = db.query(models.Province).filter_by(name=province_name).first()
                    
                    if not db_province:
                        db_province = models.Province(name=province_name)
                        db.add(db_province)
                        db.flush() # Để lấy ID cho bước sau
                    
                    # 2. Thêm danh sách Phường/Xã từ key "ward"
                    # Chúng ta chỉ lấy tên Phường/Xã hiện tại làm danh mục chọn 
                    wards_dict = data.get("ward", {})
                    for ward_name in wards_dict.keys():
                        # Kiểm tra trùng lặp trước khi thêm
                        exists = db.query(models.Ward).filter_by(
                            name=ward_name, 
                            province_id=db_province.id
                        ).first()
                        
                        if not exists:
                            new_ward = models.Ward(name=ward_name, province_id=db_province.id)
                            db.add(new_ward)
                print(f"[OK] Đã nạp tỉnh {province_name} và {len(wards_dict)} phường xã.")
        
        db.commit()
        print("[DONE] Đã nạp xong 34 tỉnh và toàn bộ phường xã mới!")
    except Exception as e:
        print(f"[ERROR] Lỗi khi nạp data: {e}")
        db.rollback()
    finally:
        db.close()