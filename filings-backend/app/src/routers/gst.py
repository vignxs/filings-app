from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.gst import service, schemas

router = APIRouter(
    tags=["gst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/req-gst", status_code=200)
async def request_gst(gst: schemas.IGS_REQ_GST, db: Session= Depends(get_db)):
    return service.create_gst(db=db ,  gst=gst )

@router.get("/req-service-gst/{id}", response_model=schemas.IGS_REQ_GST)
def request_service_gst(id: str,  db: Session = Depends(get_db)):
    return service.get_gst(db=db, req_id = id)

@router.put("/gst-update", response_model=schemas.IGS_REQ_GST)
async def gst_data_update(gst_update:schemas.IGS_REQ_GST,  db: Session = Depends(get_db)):
    service.update_gst(db=db , gst_update=gst_update)