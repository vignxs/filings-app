from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import  select, update, delete

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user(db: Session, user: str):
    return db.query(models.User).filter(models.User.user_name == user).first()

def create_request(db: Session, request: schemas.IGS_REQ_DATA):
    db_req = models.IGS_REQ_DATA(**request)
    db.add(db_req)
    db.commit()
    db.refresh(db_req)

def get_requests(db:Session):
    return db.query(models.IGS_REQ_DATA).all()

def update_request(db:Session , request:schemas.IGS_REQ_DATA):
    stmt = update(models.IGS_REQ_DATA).where(models.IGS_REQ_DATA.req_id == request.req_id).values(request)
    db.update(stmt)
    db.commit()
    return request.req_id
    
def update_request(db:Session , request:schemas.IGS_REQ_DATA):
    # stmt = delete(models.IGS_REQ_DATA).where(models.IGS_REQ_DATA.req_id == request.req_id)
    db.delete(request)
    db.commit()
    return request.req_id
    