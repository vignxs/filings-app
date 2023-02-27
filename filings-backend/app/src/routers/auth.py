from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from fastapi import Request
from sqlalchemy.orm import Session
from ..dependencies import get_db , AuthHandler

router = APIRouter(tags=["auth"])

#Auth
auth_handler = AuthHandler()
users = []

@router.post('/register', status_code=201)
async def register(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    print(data)
    name_exists = db.query(User).filter(User.user_name == data['user_name']).first() is not None
    if name_exists:
        raise HTTPException(status_code=401, detail='User name already exists')
    exists = db.query(User).filter(User.email == data['email']).first() is not None
    print(exists)
    if exists:
        raise HTTPException(status_code=401, detail='Email already exists')
    hashed_password = auth_handler.get_password_hash(data['password'])
    print(hashed_password)
    # user = User()
    # user.user_name = data["username"]
    # user.user_name = data["username"]
    # user.user_name = data["username"]
    # user.user
    db.add( User(user_name = data['user_name'] , email = data['email'], password = hashed_password))
    db.commit()
    return data['email']


@router.post('/login')
async def login(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    print(data)
    exists = db.query(User).filter(User.email == data['email']).first()
    if (exists is None) or (not auth_handler.verify_password(data['password'], exists.password)):
        raise HTTPException(status_code=401, detail='Invalid email and/or password')
    token = auth_handler.encode_token(data['email'])
    return { 'token': token }


@router.get('/unprotected')
def unprotected():
    return { 'hello': 'world' }


@router.get('/protected')
def protected(username=Depends(auth_handler.auth_wrapper)):
    return { 'name': username }