from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.pan_rgst import service, schemas

router = APIRouter(
    prefix="/pan_rgst",
    tags=["pan_rgst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/req-pan_rgst",  response_model=schemas.IGS_REQ_PAN_RGST, status_code=201)
async def request_pan_rgst(pan_rgst: schemas.IGS_REQ_PAN_RGST, db: Session= Depends(get_db)):
    return service.create_pan_rgst(db=db ,  pan_rgst=pan_rgst )

@router.get("/req-service-pan_rgst/{id}", response_model=schemas.IGS_REQ_PAN_RGST)
def request_service_pan_rgst(id: int,  db: Session = Depends(get_db)):
    return service.get_pan_rgst(db=db, req_id = id)