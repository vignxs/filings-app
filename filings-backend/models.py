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
	__tablename__ = "FILINGS_SERVICES"
	__table_args__ = {'extend_existing': True} 

	srvc_id = Column(Integer, primary_key=True, index=True)
	srvc_name = Column(String)
	
class IGS_ENQ_DATA(Base):
	__tablename__ = "IGS_ENQ_DATA"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, primary_key=True, index=True)
	fst_name = Column(String)
	lst_name = Column(String)
	cldnry_img_url = Column(String)
	mobile_no = Column(BigInteger)
	email = Column(String)
	status = Column(String)
	pincode = Column(BigInteger)
	enq_for = Column(String)

class IGS_ENQ_GST(Base):
	__tablename__ = "IGS_ENQ_GST"
	__table_args__ = {'extend_existing': True} 

	id = Column(Integer, primary_key=True, index=True)
	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	gst_time = Column(String)
	period = Column(String)
	cldnry_img_url = Column(String)

class IGS_ENQ_TAX(Base):
	__tablename__ ="ENQ_TAX"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	assessment_yr = Column(Integer)
	pan_no = Column(Integer)
	cldnry_img_url = Column(String)
	id = Column(Integer, primary_key=True, index=True)



class IGS_ENQ_GST_RGST(Base):
	__tablename__ = "ENQ_GST_RGST"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	cmpy_adrs = Column(String)
	emp_pan_crd = Column(String)
	cldnry_img_url = Column(String)
	cmpy_name = Column(String)
	id = Column(Integer, primary_key=True, index=True)


class IGS_ENQ_PAN_RGST(Base):
	__tablename__ = "ENQ_PAN_RGST"
	__table_args__ = {'extend_existing': True} 

	enq_id = Column(String, ForeignKey("IGS_ENQ_DATA.enq_id"))
	othr_dtls = Column(String)
	cldnry_img_url = Column(String)
	usr_adrs = Column(String)
	id = Column(Integer, primary_key=True, index=True)





	

	

	
	

