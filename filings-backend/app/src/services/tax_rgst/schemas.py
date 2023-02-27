from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_TAX_RGST(BaseModel):
    
    req_id : str
    assessment_year : str
    pan : str
    created_by : str
    updated_by : str
    created_at : datetime
    updated_at : datetime

    class Config:
        orm_mode = True