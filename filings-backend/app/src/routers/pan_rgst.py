from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.pan_rgst import service, schemas

router = APIRouter(
    tags=["pan_rgst"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)
# response_model=schemas.IGS_REQ_PAN_RGST,
@router.post("/req-pan-rgst", status_code=200)
async def request_pan_rgst(pan_rgst: schemas.IGS_REQ_PAN_RGST, db: Session= Depends(get_db)):
    return service.create_pan_rgst(db=db ,  pan_rgst=pan_rgst )

@router.get("/req-service-pan-rgst/{id}")
def request_service_pan_rgst(id: str,  db: Session = Depends(get_db)):
    return service.get_pan_rgst(db=db, req_id = id)

@router.put("/pan-rgst-update", response_model=schemas.IGS_REQ_PAN_RGST)
async def pan__rgst_data_update(pan_rgst_update:schemas.IGS_REQ_PAN_RGST,  db: Session = Depends(get_db)):
   service.update_pan_rgst(db=db , pan_rgst_update=pan_rgst_update)