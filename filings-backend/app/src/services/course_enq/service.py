from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import update,delete

def create_course_enquiry(db: Session, request: schemas.IGS_COURSE_ENQ):
    db_req = models.IGS_COURSE_ENQ(**request.dict())
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req.id

def get_course_enquiry(db:Session):
    return db.query(models.IGS_COURSE_ENQ).all()


def update_course_enquiry(db:Session , request:schemas.IGS_COURSE_ENQ_ID) -> int:
    db_req = update(models.IGS_COURSE_ENQ).where(models.IGS_COURSE_ENQ.id == request.id).values(request.dict())
    db.execute(db_req)
    db.commit()
    return request.id


def delete_course_enquiry(db:Session , id: int):
    db_req = delete(models.IGS_COURSE_ENQ).where(models.IGS_COURSE_ENQ.id== id)
    db.execute(db_req)
    db.commit()
    return {id}
