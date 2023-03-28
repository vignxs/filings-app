from sqlalchemy import  Column, Integer, String, DateTime, BigInteger, func,event
from ...database import Base

class IGS_JOB_SUPPORT(Base):
    __tablename__ = "IGS_JOB_SUPPORT"
    __table_args__ = {'extend_existing': True} 

    id = Column(Integer, primary_key=True,autoincrement = True,  index=True)
    candidate_name=Column(String)
    mobile= Column(BigInteger)
    technology= Column(String)
    start_date= Column(String)
    followup_date= Column(String)
    resource= Column(String)
    status= Column(String)
    feedback= Column(String)
    created_by = Column(String)
    updated_by = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    payment_period = Column(String)

@event.listens_for(IGS_JOB_SUPPORT, 'before_update')
def before_update_listener(mapper, connection, target):
    target.updated_at = func.now()
 