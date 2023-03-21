from pydantic import BaseModel

class User(BaseModel):
	email: str
	user_name : str
	password: str
	active_flag : bool = 1
	is_admin : bool 
	apps : list 

	class Config:
		orm_mode = True
  
class UserLogin(BaseModel):
	email: str
	password: str
 
class AdminUser(BaseModel):
	email: str
	user_name : str
	is_admin : bool 
	apps : list 