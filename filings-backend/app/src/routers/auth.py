from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.auth import service, schemas

router = APIRouter(tags=["auth"])

@router.post('/register', status_code=201)
async def register(user:schemas.User,  db: Session = Depends(get_db)):
	db_user = service.get_user_by_user(db, user=user.user_name) 
	if db_user:
		raise HTTPException(status_code=401, detail='User name already exists')

	db_user_email = service.get_user_by_email(db, email=user.email) 
	if db_user_email:
		raise HTTPException(status_code=401, detail='Email already exists')
	return service.create_user(db=db, user=user)

@router.post('/login')
def login(user: schemas.User, db: Session = Depends(get_db)):
	db_user = service.get_user_by_email(db, email=user.email)
	if not db_user:
		raise HTTPException(status_code=400, detail="Email already registered")

	if not service.verify_password(user.password, db_user.password):
		raise HTTPException(status_code=400, detail="You have entered the wrong password")
	return {"token": service.create_access_token(user.email)}


