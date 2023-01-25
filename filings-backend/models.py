from sqlalchemy import  Column, ForeignKey, Integer, String, BigInteger, BOOLEAN
from database import Base
# import bcrypt

class User(Base):
	
	__tablename__ = "Users"
	__table_args__ = {'extend_existing': True} 
 
	user_id = Column(Integer,  primary_key=True, autoincrement = True , index=True)
	user_name = Column(String, unique=True)
	email = Column(String, unique=True)
	password = Column(String)
	# active_flag
 
 
class IGS_FILINGS_SERVICES(Base):
	__tablename__ = "IGS_FILINGS_SERVICES"
	__table_args__ = {'extend_existing': True} 

	service_id = Column(Integer, primary_key=True, index=True)
	service_name = Column(String)
	
class IGS_ENQ_DATA(Base):
	__tablename__ = "IGS_ENQ_DATA"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, primary_key=True, index=True)
	first_name = Column(String)
	last_name = Column(String)
	mobile = Column(BigInteger)
	email = Column(String)
	address = Column(String)
	city = Column(String)
	pincode = Column(BigInteger)
	enquired_for = Column(String)
	status = Column(String)
 

class IGS_ENQ_GST(Base):
	__tablename__ = "IGS_ENQ_GST"
	__table_args__ = {'extend_existing': True} 

	id = Column(Integer, primary_key=True, autoincrement = True, index=True)
	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	gst_time = Column(String)
	period = Column(String)

class IGS_ENQ_TAX(Base):
	__tablename__ ="IGS_ENQ_TAX"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	assessment_year = Column(String)
	pan = Column(String)
	id = Column(Integer, primary_key=True, autoincrement = True,index=True)



class IGS_ENQ_GST_RGST(Base):
	__tablename__ = "IGS_ENQ_GST_RGST"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	company_name = Column(String)
	company_address = Column(String)
	company_city = Column(String)
	company_pincode = Column(String)
	company_email = Column(String)
	employer_pan = Column(String)
	id = Column(Integer, primary_key=True,autoincrement = True,  index=True)


class IGS_ENQ_PAN_RGST(Base):
	__tablename__ = "IGS_ENQ_PAN_RGST"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	aadhar = Column(String)
	id = Column(Integer, primary_key=True,autoincrement = True, index=True)





	

	

	
	

