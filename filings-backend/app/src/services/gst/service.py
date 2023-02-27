from sqlalchemy.orm import Session
from . import models, schemas


def create_gst(db: Session, gst: schemas.IGS_REQ_GST):
    db_user = models.IGS_REQ_GST(**gst)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return gst.req_id

def get_gst(db: Session, req_id : int):
    return db.query(models.IGS_REQ_GST).filter(models.IGS_REQ_GST.req_id == req_id).all()
    

