from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import  select, update, delete


def create_gst_rgst(db: Session, gst_rgst: schemas.IGS_REQ_GST_RGST):
    db_user = models.IGS_REQ_GST_RGST(**gst_rgst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return gst_rgst.req_id

def get_gst_rgst(db: Session, req_id : str):
    return db.query(models.IGS_REQ_GST_RGST).filter(models.IGS_REQ_GST_RGST.req_id == req_id).first()
    
def update_gst_rgst(db:Session , gst_rgst_update:schemas.IGS_REQ_GST_RGST):
    stmt = update(models.IGS_REQ_GST_RGST).where(models.IGS_REQ_GST_RGST.req_id == gst_rgst_update.req_id).values(gst_rgst_update.dict())
    db.execute(stmt)
    db.commit()
    return gst_rgst_update.req_id
