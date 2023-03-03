from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import  select, update, delete


def create_gst(db: Session, gst: schemas.IGS_REQ_GST):
    db_user = models.IGS_REQ_GST(**gst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return gst.req_id

def get_gst(db: Session, req_id : str):
    return db.query(models.IGS_REQ_GST).filter(models.IGS_REQ_GST.req_id == req_id).first()
    
def update_gst(db:Session , gst_update:schemas.IGS_REQ_GST):
    stmt = update(models.IGS_REQ_GST).where(models.IGS_REQ_GST.req_id == gst_update.req_id).values(gst_update.dict())
    db.execute(stmt)
    db.commit()
    return gst_update.req_id

