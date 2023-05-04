from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.request import service, schemas

router = APIRouter(
    tags=["request"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post('/req-data', status_code=status.HTTP_201_CREATED)
async def request_data(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    return service.create_request(db=db , request=request)

@router.get("/req-data-all")
def request_data(db: Session = Depends(get_db)):
    return service.get_requests(db=db) 

@router.put("/req-data-update")
async def request_data_update(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    return service.update_request(db=db , request=request)
    
@router.delete("/req-data-delete")
async def request_data_delete(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    return service.delete_request(db=db , request=request)


@router.post('/req-services', status_code=status.HTTP_201_CREATED)
async def service_data(request: schemas.IGS_REQ_SERVICES,  db: Session = Depends(get_db)):
    return service.create_service(db=db, request=request)

@router.get("/req-services-all")
def service_data(db: Session = Depends(get_db)):
    return service.get_service(db=db)


@router.put("/req-services-update") 
async def service_data_update(request: schemas.IGS_REQ_SERVICES,  db: Session = Depends(get_db)):
    return service.update_service(db=db, request=request)
