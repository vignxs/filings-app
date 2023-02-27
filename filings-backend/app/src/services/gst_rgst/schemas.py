from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_GST_RGST(BaseModel):

    req_id : str
    company_name : str
    company_address : str
    company_city : str
    company_pincode : str
    company_email : str
    employer_pan : str
    created_by : str
    updated_by : str
    created_at : datetime
    updated_at : datetime
    
    class Config:
        orm_mode = True