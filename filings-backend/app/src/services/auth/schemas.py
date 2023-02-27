from pydantic import BaseModel

class UserBase(BaseModel):
	email: str

class UserCreate(UserBase):
	password: str
	
class User(UserBase):
	user_id : str
	user_name : str
	active_flag : bool

	class Config:
		orm_mode = True