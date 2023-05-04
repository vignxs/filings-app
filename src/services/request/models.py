from sqlalchemy import  Column, Integer, String, BigInteger , DateTime, func
from ...database import Base

class IGS_REQ_DATA(Base):
    __tablename__ = "IGS_REQ_DATA"
    __table_args__ = {'extend_existing': True} 

    # child = relationship(IGS_ENQ_GST, backref="parent", passive_deletes=True)
    req_id = Column(String, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    mobile = Column(BigInteger)
    email = Column(String)
    address = Column(String)
    city = Column(String)
    pincode = Column(BigInteger)
    enquired_for = Column(String)
    status = Column(String)
    created_by = Column(String)
    updated_by = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
 
class IGS_REQ_SERVICES(Base):
	__tablename__ = "IGS_REQ_SERVICES"
	__table_args__ = {'extend_existing': True} 

	service_id = Column(Integer, primary_key=True, autoincrement = True, index=True)
	service_name = Column(String)