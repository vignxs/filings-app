from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import  select, update, delete


def create_tax_rgst(db: Session, tax_rgst: schemas.IGS_REQ_TAX_RGST):
    db_user = models.IGS_REQ_TAX_RGST(**tax_rgst.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return tax_rgst.req_id

def get_tax_rgst(db: Session, req_id : str):
    return db.query(models.IGS_REQ_TAX_RGST).filter(models.IGS_REQ_TAX_RGST.req_id == req_id).first()
    
def update_tax_rgst(db:Session , tax_rgst_update:schemas.IGS_REQ_TAX_RGST):
    stmt = update(models.IGS_REQ_TAX_RGST).where(models.IGS_REQ_TAX_RGST.req_id == tax_rgst_update.req_id).values(tax_rgst_update.dict())
    db.execute(stmt)
    db.commit()
    return tax_rgst_update.req_id
