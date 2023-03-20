from ..services.request import service, schemas
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.job_support import service, schemas

router = APIRouter(
    tags=["job_support"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post('/job-support-data', status_code=200)
async def job_support_data(request: schemas.IGS_JOB_SUPPORT,  db: Session = Depends(get_db)):
    return service.create_request(db=db, request=request)


@router.get("/job-support-data-all", response_model=List[schemas.IGS_JOB_SUPPORT_GU])
def job_support_data(db: Session = Depends(get_db)):
    return service.get_requests(db=db)


@router.put("/job-support-data-update")  # response_model=schemas.IGS_REQ_DATA)
async def job_support_data_update(request: schemas.IGS_JOB_SUPPORT_GU,  db: Session = Depends(get_db)):
    return service.update_request(db=db, request=request)


@router.delete("/job-support-data-delete/{id}")
async def job_support_data_delete(request: schemas.IGS_JOB_SUPPORT_GU,  db: Session = Depends(get_db)):
    return service.delete_request(db=db, request=request)
