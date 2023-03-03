from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.request import service, schemas

router = APIRouter(
    tags=["request"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post('/req-data', status_code=200)
async def request_data(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    return service.create_request(db=db , request=request)

@router.get("/req-data-all", response_model=List[schemas.IGS_REQ_DATA])
def request_data(db: Session = Depends(get_db)):
    return service.get_requests(db=db) 

@router.put("/req-data-update", response_model=schemas.IGS_REQ_DATA)
async def request_data_update(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    service.update_request(db=db , request=request)
    
@router.delete("/req-data-delete")
async def request_data_delete(request:schemas.IGS_REQ_DATA,  db: Session = Depends(get_db)):
    return service.delete_request(db=db , request=request)
