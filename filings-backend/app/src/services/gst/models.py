from sqlalchemy import  Column, Integer, String, ForeignKey, DateTime, func 
from ...database import Base

class IGS_REQ_GST(Base):
    __tablename__ = "IGS_REQ_GST"
    __table_args__ = {'extend_existing': True} 

    id = Column(Integer, primary_key=True, autoincrement = True, index=True)
    req_id = Column(String, ForeignKey("IGS_REQ_DATA.req_id", ondelete='CASCADE') )
    gst_time = Column(String)
    period = Column(String)	
    created_by = Column(String)
    updated_by = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())