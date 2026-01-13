
export interface StudentProfile {
  personal: {
    first_name: string;
    last_name: string; // Used as last_middle_name
    dob: string;
    gender: string;
    national_id: string;
    id_issue_date?: string;
    id_issue_place?: string;
    avatar_url?: string;
  };
  contact: {
    email: string;
    personal_email: string;
    phone: string;
    address_permanent: string;
    address_current: string;
  };
  academic: {
    student_id: string;
    faculty: string;
    major: string;
    class_code: string;
    enrollment_year: number;
    study_duration_standard?: string;
    status: string;
    entry_semester?: string;
    max_semesters?: number;

    // Additional fields from student.txt
    management_unit?: string;
    enrollment_date?: string;
    curriculum_year?: number;
    extended_semesters?: number;
    reduced_semesters?: number;
    standard_semesters?: number;
    expected_graduation_date?: string;
    max_graduation_date?: string;
    education_level?: string;
    training_system?: string;
    training_type?: string;
    program?: string;
    campus?: string;
    local_training?: string;
    training_session?: string;
  };
  graduation: {
    grad_major?: string;
    grad_year_semester?: string;
    grad_decision_number?: string;
    grad_decision_date?: string;
  };
  bank: {
    bank_account?: string;
    bank_name?: string;
    ocb_cif?: string;
    bknet_account?: string;
  };
  other: {
    note?: string;
  };
  last_updated_at?: string;
}
