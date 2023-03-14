from pydantic import BaseModel
from datetime import date

class IGS_JOB_SUPPORT(BaseModel):

    candidate_name : str
    mobile : int
    technology : str
    start_date : date
    followup_date : date
    resource : str
    status : str
    feedback : str
    
    class Config:
        orm_mode = True