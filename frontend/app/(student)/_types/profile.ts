
export interface StudentProfile {
  personal: {
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    id_card_number: string;
    id_card_date?: string;
    id_card_place?: string;
    avatar_url?: string;
  };
  contact: {
    student_email: string;
    personal_email: string;
    phone: string;
    family_phone?: string;
    dorm_room?: string;
    current_full_address: string;
    address_permanent?: string;
  };
  permanent_address: {
    permanent_full_address: string;
  };
  academic: {
    student_id: string;
    faculty: string;
    major: string;
    class_code: string;
    enrollment_date: string;
    student_status: string;
    education_level?: string;
    training_system?: string;
    campus?: string;
    entry_semester?: string;
    
    // Remaining fields from student.txt
    management_unit?: string;
    curriculum_year?: number;
    expected_graduation_date?: string;
  };
  finance: {
    bank_account?: string;
    bank_name?: string;
    bknet_account?: string;
    ocb_cif?: string;
  };
  graduation: {
    grad_major?: string;
    grad_year_semester?: string;
    grad_decision_number?: string;
    grad_decision_date?: string;
  };
  other: {
    note?: string;
  };
  last_updated_at?: string;
}
