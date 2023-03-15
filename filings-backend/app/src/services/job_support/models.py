from sqlalchemy import  Column, Integer, String, ForeignKey, DateTime, func 
from ...database import Base

class IGS_JOB_SUPPORT(Base):
    __tablename__ = "IGS_JOB_SUPPORT"
    __table_args__ = {'extend_existing': True} 

    id = Column(Integer, primary_key=True,autoincrement = True,  index=True)
    candidate_name=Column(String)
    mobile= Column(Integer)
    technology= Column(String)
    start_date= Column(DateTime)
    followup_date= Column(DateTime)
    resource= Column(String)
    status= Column(String)
    feedback= Column(String)

 