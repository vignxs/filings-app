from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.gst import service, schemas

router = APIRouter(
    prefix="/gst",
    tags=["gst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/req-gst",  response_model=schemas.IGS_REQ_GST, status_code=201)
async def request_gst(gst: schemas.IGS_REQ_GST, db: Session= Depends(get_db)):
    return service.create_gst(db=db ,  gst=gst )

@router.get("/req-service-gst/{id}", response_model=schemas.IGS_REQ_GST)
def request_service_gst(id: int,  db: Session = Depends(get_db)):
    return service.get_gst(db=db, req_id = id)