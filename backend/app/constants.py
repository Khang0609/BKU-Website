import enum

class Status(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    GRADUATED = "graduated"

class Gender(str, enum.Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"

class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    LECTURER = "LECTURER"
    ADMIN = "ADMIN"
    OFFICE = "OFFICE"

class TrainingSystem(str, enum.Enum):
    REGULAR = "chính quy"
    VLVH = "vừa học vừa làm"
    REMOTE = "từ xa"
    SECOND_DEGREE = "văn bằng 2"
    INTERCONNECTED = "liên thông"

class LevelOfEducation(str, enum.Enum):
    BACHELOR = "cử nhân"
    MASTER = "thạc sĩ"
    PHD = "tiến sĩ"

class TypeOfTraining(str, enum.Enum):
    CANONICAL = "chính tắc"

class EducationalProgram(str, enum.Enum):
    CLC = "Chương trình Đại học Dạy và học bằng tiếng Anh" 

class TeachingFalities(str, enum.Enum):
    BK1 = "ĐHBK Cơ sở 1 - Lý Thường Kiệt, Diên Hồng"
    BK2 = "ĐHBK Cơ sở 2 -  "