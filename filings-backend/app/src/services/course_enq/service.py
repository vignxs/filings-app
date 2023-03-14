from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import update,delete

def create_course_enquiry(db: Session, request: schemas.IGS_COURSE_ENQ):
    deeds = models.IGS_COURSE_ENQ(**request.dict())
    db.add(deeds)
    db.commit()
    db.refresh(deeds)
    return deeds.name

def course_enquiry(db:Session):
    return db.query(models.IGS_COURSE_ENQ).all()

def update_course_enquiry(db:Session , request:schemas.IGS_COURSE_ENQ):
    deeds = update(models.IGS_COURSE_ENQ).where(models.IGS_COURSE_ENQ.name == request.name).values(request.dict())
    db.execute(deeds)
    db.commit()
    return request.name
    
def delete_course_enquiry(db:Session , request:schemas.IGS_COURSE_ENQ):
    deeds = delete(models.IGS_COURSE_ENQ).where(models.IGS_COURSE_ENQ.name == request.name)
    db.execute(deeds)
    db.commit()
    return request.name
    