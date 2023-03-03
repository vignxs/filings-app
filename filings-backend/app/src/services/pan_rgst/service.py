from sqlalchemy.orm import Session
from . import models, schemas


def create_pan_rgst(db: Session, pan_rgst: schemas.IGS_REQ_PAN_RGST):
    db_user = models.IGS_REQ_PAN_RGST(**pan_rgst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return pan_rgst.req_id

def get_pan_rgst(db: Session, req_id : int):
    print(req_id)
    return db.query(models.IGS_REQ_PAN_RGST).filter(models.IGS_REQ_PAN_RGST.req_id == req_id).first()
    

