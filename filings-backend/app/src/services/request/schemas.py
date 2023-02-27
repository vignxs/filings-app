from pydantic import BaseModel
from datetime import datetime

class IGS_REQ_DATA(BaseModel):

    req_id : str
    first_name : str
    last_name : str
    mobile : int
    email : str
    address : str
    city : str
    pincode : int
    enquired_for : str
    status : str = "created"
    created_by : str
    updated_by : str
    created_at : datetime
    updated_at : datetime
    
    class Config:
        orm_mode = True