from datetime import datetime
from pydantic import BaseModel

class IGS_REQ_GST(BaseModel):
    req_id : str
    gst_time : str
    period : str	
    created_by : str
    updated_by : str
    created_at : datetime
    updated_at : datetime 
    
    class Config:
        orm_mode = True