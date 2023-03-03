from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import  select, update, delete

def create_request(db: Session, request: schemas.IGS_REQ_DATA):
    db_req = models.IGS_REQ_DATA(**request.dict())
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req.req_id

def get_requests(db:Session):
    return db.query(models.IGS_REQ_DATA).all()

def update_request(db:Session , request:schemas.IGS_REQ_DATA):
    stmt = update(models.IGS_REQ_DATA).where(models.IGS_REQ_DATA.req_id == request.req_id).values(request.dict())
    db.execute(stmt)
    db.commit()
    return request.req_id
    
def delete_request(db:Session , request:schemas.IGS_REQ_DATA):
    stmt = delete(models.IGS_REQ_DATA).where(models.IGS_REQ_DATA.req_id == request.req_id)
    db.execute(stmt)
    db.commit()
    return request.req_id
    