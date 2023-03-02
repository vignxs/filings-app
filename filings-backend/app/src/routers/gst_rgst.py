from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.gst_rgst import service, schemas

router = APIRouter(
    tags=["gst_rgst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/req-gst-rgst", status_code=201)
async def request_gst_rgst(gst_rgst: schemas.IGS_REQ_GST_RGST, db: Session= Depends(get_db)):
    return service.create_gst_rgst(db=db ,  gst_rgst=gst_rgst )

@router.get("/enq-service-gst-rgst/{id}", response_model=schemas.IGS_REQ_GST_RGST)
def request_service_gst_rgst(id: int,  db: Session = Depends(get_db)):
    return service.get_gst_rgst(db=db, req_id = id)