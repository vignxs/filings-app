from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_PAN_RGST(BaseModel):
    
    req_id : str 
    aadhar : str
    created_by : str
    updated_by : str
    created_at : datetime
    updated_at : datetime


    class Config:
        orm_mode = True