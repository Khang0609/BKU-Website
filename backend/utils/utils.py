def split_vietnamese_name(full_name: str):
    # 1. Xóa khoảng trắng thừa ở 2 đầu
    full_name = full_name.strip()
    
    # 2. rsplit(None, 1) sẽ tách từ cuối cùng ra, tối đa 1 lần tách
    parts = full_name.rsplit(None, 1)
    
    if len(parts) == 2:
        last_name = parts[0]  # Phần còn lại (Họ và tên đệm)
        first_name = parts[1] # Từ cuối cùng (Tên)
    else:
        # Trường hợp tên chỉ có 1 từ (ví dụ: "Dũng")
        last_name = ""
        first_name = parts[0]
        
    return last_name, first_name