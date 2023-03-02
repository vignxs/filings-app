from sqlalchemy.orm import Session
from . import models, schemas


def create_tax_rgst(db: Session, tax_rgst: schemas.IGS_REQ_TAX_RGST):
    db_user = models.IGS_REQ_TAX_RGST(**tax_rgst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return tax_rgst.req_id

def get_tax_rgst(db: Session, req_id : int):
    return db.query(models.IGS_REQ_TAX_RGST).filter(models.IGS_REQ_TAX_RGST.req_id == req_id).all()
    

