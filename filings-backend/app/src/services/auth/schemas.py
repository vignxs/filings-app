from pydantic import BaseModel

class User(BaseModel):
	# user_id : str
	email: str
	user_name : str
	password: str
	active_flag : bool = 1

	class Config:
		orm_mode = True