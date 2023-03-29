from pydantic import BaseModel
from datetime import datetime
from typing import ForwardRef

class JOB_SUPPORT_PAYMENT(BaseModel):

    candidate_payment_amount: int
    candidate_payment_status: str
    candidate_payment_date: datetime
    resource_payment_amount: int
    resource_payment_status: str
    resource_payment_date: datetime
    payment1 : ForwardRef('IGS_JOB_SUPPORT')


class JOB_SUPPORT_COMMENTS(BaseModel):

    job_support_id: int
    comments: str
    commented_at: datetime
    comment1: ForwardRef('IGS_JOB_SUPPORT')


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
    payment: ForwardRef('JOB_SUPPORT_PAYMENT')
    # comment: ForwardRef('JOB_SUPPORT_COMMENTS')

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

    
IGS_JOB_SUPPORT.update_forward_refs()
JOB_SUPPORT_PAYMENT.update_forward_refs()
JOB_SUPPORT_COMMENTS.update_forward_refs()

