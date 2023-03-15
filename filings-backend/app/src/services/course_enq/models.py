from sqlalchemy import Column, String, Integer, Date
from ...database import Base

class IGS_COURSE_ENQ(Base):
    __tablename__ = "Course_Enquiry"

    req_id = Column(String, primary_key=True, index=True)
    name = Column(String)
    followup_call_date = Column(Date)
    followup_status = Column(String)
    enquiry_by = Column(String)
    mobile = Column(Integer)
    location = Column(String)
    course = Column(String)
    fee_structure = Column(String)
    experience_by = Column(String)
    info_source = Column(String)
    purpose = Column(String)
    mode = Column(String)
    comments = Column(String)