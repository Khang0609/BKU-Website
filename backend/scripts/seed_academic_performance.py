import os
import sys
from datetime import date

# Thêm đường dẫn backend vào sys.path để Python tìm thấy module app
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, '..')
sys.path.append(backend_dir)

from app.database import SessionLocal
from app.models import (
    Identity, GeneralInformation, StudentRoleAnchor, UserRole,
    Semester, Course, CourseComponent, Enrollment,
    StudentComponentGrade, SemesterResult, Scholarship,
    ScholarshipRecipient, ScholarshipStatus
)

def seed_data():
    db = SessionLocal()
    try:
        # Check if student already exists
        print("Checking for existing Student 2550001 (Nguyễn Văn A)...")
        anchor = db.query(StudentRoleAnchor).filter(StudentRoleAnchor.student_code == "2550001").first()
        
        if anchor:
            print("Student 2550001 found. Reusing existing identity.")
            identity_id = anchor.identity_id
            gen_info = db.query(GeneralInformation).filter(GeneralInformation.identity_id == identity_id).first()
        else:
            # 1. Create Identity for Student
            print("Creating Identity for Nguyễn Văn A...")
            identity = Identity(role=UserRole.STUDENT)
            db.add(identity)
            db.flush()  # To get identity.id
            identity_id = identity.id

            # 2. Create General Information
            print("Creating General Information...")
            gen_info = GeneralInformation(
                identity_id=identity_id,
                first_name="A",
                last_name="Nguyễn Văn",
                date_of_birth=date(2005, 1, 1),
            )
            db.add(gen_info)

            # 3. Create Student Role Anchor (MSSV: 2550001)
            print("Creating Student Role Anchor...")
            anchor = StudentRoleAnchor(
                identity_id=identity_id,
                student_code="2550001",
                student_status="Đang học"
            )
            db.add(anchor)
            db.flush()

        # 4. Ensure Semester exists
        print("Checking/Creating Semester...")
        semester = db.query(Semester).filter(Semester.id == "HK242").first()
        if not semester:
            from app.models.adminstrative.semester import SemesterTerm
            semester = Semester(
                id="HK242",
                academic_year="2024-2025",
                term=SemesterTerm.HK2,
                start_date=date(2025, 2, 1),
                end_date=date(2025, 6, 30),
                is_active=True
            )
            db.add(semester)
            db.flush()

        # 5. Ensure Course exists
        print("Checking/Creating Course...")
        course = db.query(Course).filter(Course.id == "CO1001").first()
        if not course:
            course = Course(
                id="CO1001",
                name="Giải tích 1",
                credits=4
            )
            db.add(course)
            db.flush()

        # 6. Create or Get Course Components (Midterm 20%, Final 80%)
        print("Checking/Creating Course Components...")
        comp_mid = db.query(CourseComponent).filter(CourseComponent.course_id == course.id, CourseComponent.component_name == "BT/GK").first()
        if not comp_mid:
            comp_mid = CourseComponent(course_id=course.id, component_name="BT/GK", weight=0.2)
            db.add(comp_mid)
        
        comp_final = db.query(CourseComponent).filter(CourseComponent.course_id == course.id, CourseComponent.component_name == "CK").first()
        if not comp_final:
            comp_final = CourseComponent(course_id=course.id, component_name="CK", weight=0.8)
            db.add(comp_final)
        db.flush()

        # 7. Create or Get Enrollment
        print("Checking/Creating Enrollment...")
        enrollment = db.query(Enrollment).filter(
            Enrollment.anchor_id == anchor.identity_id,
            Enrollment.course_id == course.id,
            Enrollment.semester_id == semester.id
        ).first()

        if not enrollment:
            enrollment = Enrollment(
                anchor_id=anchor.identity_id,
                course_id=course.id,
                semester_id=semester.id
            )
            db.add(enrollment)
            db.flush()

        # 8. Add Grades (Update if exists)
        print("Updating Grades...")
        # Clear existing grades for this enrollment to avoid conflicts
        db.query(StudentComponentGrade).filter(StudentComponentGrade.enrollment_id == enrollment.id).delete()
        
        grade_mid = StudentComponentGrade(enrollment_id=enrollment.id, component_id=comp_mid.id, raw_grade=9.0)
        grade_final = StudentComponentGrade(enrollment_id=enrollment.id, component_id=comp_final.id, raw_grade=9.5)
        db.add_all([grade_mid, grade_final])
        
        # 9. Calculate and Add Semester Result
        print("Updating Semester Result...")
        db.query(SemesterResult).filter(SemesterResult.enrollment_id == enrollment.id).delete()
        
        result = SemesterResult(
            enrollment_id=enrollment.id,
            final_grade_10=9.4,
            final_grade_4=3.8,  # Approximate
            is_passed=True
        )
        db.add(result)

        # 10. Create Scholarship Package
        print("Checking/Creating Scholarship Package...")
        scholarship = db.query(Scholarship).filter(Scholarship.name == "Loại Xuất Sắc").first()
        if not scholarship:
            scholarship = Scholarship(
                name="Loại Xuất Sắc",
                gpa_4_condition=3.6,
                gpa_10_condition=9.0,
                training_point_condition=90,
                scholarship_percentage=100
            )
            db.add(scholarship)
            db.flush()

        # 11. Award Scholarship to Student
        print("Checking/Awarding Scholarship...")
        db.query(ScholarshipRecipient).filter(
            ScholarshipRecipient.anchor_id == anchor.identity_id,
            ScholarshipRecipient.semester_id == semester.id
        ).delete()

        recipient = ScholarshipRecipient(
            anchor_id=anchor.identity_id,
            scholarship_id=scholarship.id,
            semester_id=semester.id,
            status=ScholarshipStatus.APPROVED,
            gpa_4=3.8,
            gpa_10=9.4,
            cpa_4=3.8,
            cpa_10=9.4,
            credits_earned=20,
            cumulative_credits=20,
            training_point=95,
            amount=5000000.0,
            result="Đạt",
            created_by="admin",
            updated_by="admin"
        )
        db.add(recipient)

        db.commit()
        print("\nSuccessfully seeded academic performance data for Student 2550001!")
        print(f"Student: {gen_info.last_name if gen_info else 'N/A'} {gen_info.first_name if gen_info else 'N/A'}")
        print(f"Course: {course.name}, Final Grade: {result.final_grade_10}")
        print(f"Scholarship: {scholarship.name}, Status: {recipient.status}")

    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
