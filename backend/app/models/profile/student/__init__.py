from app.models.profile.student.academic import StudentAcademic
from app.models.profile.student.personal import StudentPersonal

from app.models.profile.student.parent import StudentParent
from app.models.profile.student.guardian import StudentGuardian
from app.models.profile.student.decision import StudentDecision
from app.models.profile.student.training_point import StudentTrainingPoint
from app.models.profile.student.extra_curricular import StudentExtraCurricular

__all__ = [
    "StudentAcademic",
    "StudentPersonal",
    "StudentParent",
    "StudentGuardian",
    "StudentDecision",
    "StudentTrainingPoint",
    "StudentExtraCurricular",
]
