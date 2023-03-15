from pydantic import BaseModel
from datetime import date

class IGS_COURSE_ENQ(BaseModel):
    
    name : str
    followup_call_date: date
    followup_status : str
    enquiry_by : str
    mobile : int
    location : str
    course : str
    fee_structure : str
    experience_by : str
    info_source : str
    purpose : str
    mode : str
    comments : str

    class Config:
        orm_mode = True