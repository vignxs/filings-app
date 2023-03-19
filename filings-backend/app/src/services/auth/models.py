from sqlalchemy import  Column, Integer, String, BOOLEAN , ARRAY
from ...database import Base

class User(Base):
	
	__tablename__ = "Users"
	__table_args__ = {'extend_existing': True} 
 
	user_id = Column(Integer,  primary_key=True, autoincrement = True , index=True)
	user_name = Column(String, unique=True)
	email = Column(String, unique=True)
	password = Column(String)
	active_flag = Column(BOOLEAN)
	is_admin = Column(BOOLEAN)
	apps = Column(ARRAY(String))