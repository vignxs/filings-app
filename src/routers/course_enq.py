from typing import List
from fastapi import APIRouter, Depends,status
from sqlalchemy.orm import Session
from ..dependencies import get_db
from ..services.course_enq import service, schemas

router = APIRouter(
    tags=["course_enq"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post('/course-enquiry', status_code=status.HTTP_201_CREATED)
async def course_enquiry(request:schemas.IGS_COURSE_ENQ,  db: Session = Depends(get_db)):
    return service.create_course_enquiry(db=db , request=request)

@router.get("/course-enquiry-all")
def request_course_enquiry(db: Session = Depends(get_db)):
    return service.get_course_enquiry(db=db)

@router.put("/course-enquiry-update")
async def course_enquiry_update(request:schemas.IGS_COURSE_ENQ_ID,  db: Session = Depends(get_db)):
    return service.update_course_enquiry(db=db , request=request)
 
@router.delete("/course-enquiry-delete/{id}")
async def course_enquiry_delete(id: int,  db: Session = Depends(get_db)):
    return service.delete_course_enquiry(db=db, id=id)
