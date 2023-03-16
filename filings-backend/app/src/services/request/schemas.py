from pydantic import BaseModel, root_validator
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
    created_by : str = "admin"
    updated_by : str = "admin"
    created_at : datetime = datetime.now()
    updated_at : datetime = datetime.now()
    
    class Config:
        orm_mode = True
        
    @root_validator
    def number_validator(cls, values):
        values["updated_at"] = datetime.now()
        return values