from sqlalchemy.orm import Session
from ...dependencies import AuthHandler, generate_password
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional

auth_handler = AuthHandler()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user(db: Session, user: str):
    return db.query(models.User).filter(models.User.user_name == user).first()

def create_user(db: Session, user: schemas.User):
    hashed_password = auth_handler.get_password_hash(user.password)
    db_user = models.User(user_name = user.user_name , email = user.email, password = hashed_password, is_admin = user.is_admin, apps = user.apps)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return user.email

def create_access_token(email: str, expires_delta: Optional[timedelta] = None):
	return  auth_handler.encode_token(email)
     
def verify_password(plain_password:str , hashed_password:str):
    return auth_handler.verify_password(plain_password , hashed_password)

def create_admin_user(db: Session, user: schemas.User):
    password = generate_password(8)
    print(password)
    hashed_password = auth_handler.get_password_hash(password)
    db_user = models.User(user_name = user.user_name , email = user.email, password = hashed_password, is_admin = user.is_admin, apps = user.apps)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return user.email