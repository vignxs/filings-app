from sqlalchemy.orm import Session, column_property
from . import models, schemas
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import select, update, delete


def create_request(db: Session, request: schemas.IGS_JOB_SUPPORT):
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req.id


def get_requests(db: Session):
    return db.query(models.IGS_JOB_SUPPORT).all()


def update_request(db: Session, request: schemas.IGS_JOB_SUPPORT) -> int:
    db_req = models.IGS_JOB_SUPPORT(**request.dict())
    db_req.id = request.id
    db.merge(db_req)
    db.commit()
    return request.id


def delete_request(db: Session, id:int):
    db_req = delete(models.IGS_JOB_SUPPORT).where(models.IGS_JOB_SUPPORT.id == id)
    db.execute(db_req)
    db.commit()
    return {id}


def create_payment(db: Session, request: schemas.JOB_SUPPORT_PAYMENT):
    db_pay = models.JOB_SUPPORT_PAYMENT(**request.dict())
    db.add(db_pay)
    db.commit()
    db.refresh(db_pay)
    return db_pay.id



def create_comment(db: Session, request: schemas.JOB_SUPPORT_COMMENTS):
    db_comment = models.JOB_SUPPORT_COMMENTS(**request.dict())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment.id
