from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.tax_rgst import service, schemas

router = APIRouter(
    prefix="/tax_rgst",
    tags=["tax_rgst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/req-tax-rgst",  response_model=schemas.IGS_REQ_TAX_RGST, status_code=201)
async def request_tax_rgst(tax_rgst: schemas.IGS_REQ_TAX_RGST, db: Session= Depends(get_db)):
    return service.create_tax_rgst(db=db ,  tax_rgst=tax_rgst )

@router.get("/req-service-tax-rgst/{id}", response_model=schemas.IGS_REQ_TAX_RGST)
def request_service_tax_rgst(id: int,  db: Session = Depends(get_db)):
    return service.get_tax_rgst(db=db, req_id = id)