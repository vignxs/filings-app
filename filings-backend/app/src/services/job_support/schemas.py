from pydantic import BaseModel
from datetime import datetime
from typing import ForwardRef

class IGS_JOB_SUPPORT(BaseModel):

    candidate_name: str
    mobile: int
    technology: str
    start_date: str
    followup_date: str
    resource: str
    status: str
    feedback: str
    created_by: str = "admin"
    updated_by: str = "admin"
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    payment_period: str
    date_of_enquiry : str
    charges : int

    # class Config:
    #     orm_mode = True


class IGS_JOB_SUPPORT_GU(BaseModel):

    id: int
    candidate_name: str
    mobile: int
    technology: str
    start_date: str
    followup_date: str
    resource: str
    status: str
    feedback: str
    created_by: str = "admin"
    updated_by: str = "admin"
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

