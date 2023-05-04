from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import  select, update, delete


def create_pan_rgst(db: Session, pan_rgst: schemas.IGS_REQ_PAN_RGST):
    db_user = models.IGS_REQ_PAN_RGST(**pan_rgst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return pan_rgst.req_id

def get_pan_rgst(db: Session, req_id : int):
    print(db.query(models.IGS_REQ_PAN_RGST).filter(models.IGS_REQ_PAN_RGST.req_id == req_id).first())
    return db.query(models.IGS_REQ_PAN_RGST).filter(models.IGS_REQ_PAN_RGST.req_id == req_id).first()
    
def update_pan_rgst(db:Session , pan_rgst_update:schemas.IGS_REQ_PAN_RGST):
    stmt = update(models.IGS_REQ_PAN_RGST).where(models.IGS_REQ_PAN_RGST.req_id == pan_rgst_update.req_id).values(pan_rgst_update.dict())
    db.execute(stmt)
    db.commit()
    return pan_rgst_update.req_id
