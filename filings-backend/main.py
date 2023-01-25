import json
from fastapi import Body, Depends, FastAPI, HTTPException, status
import cloudinary
from PyPDF2 import PdfReader 
from cloudinary import uploader
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
import yaml
from pathlib import Path
import models
from database import SessionLocal as db
from database import engine
import secrets
from auth import AuthHandler 
from models import User   
db  = db()

conf = yaml.safe_load(Path('config.yaml').read_text())
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', "https://filings-app.vercel.app/"],
    allow_methods=['*'],
    allow_headers=['*']
)
# cloudinary.config(**conf['cloudinary_config'])

#Auth
auth_handler = AuthHandler()
users = []

@app.post('/register', status_code=201)
async def register(request: Request):
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
    db.add( User(email = data['email'], password = hashed_password))
    db.commit()
    return data['email']


@app.post('/login')
async def login(request: Request):
    data = await request.json()
    print(data)
    exists = db.query(User).filter(User.email == data['email']).first()
    if (exists is None) or (not auth_handler.verify_password(data['password'], exists.password)):
        raise HTTPException(status_code=401, detail='Invalid email and/or password')
    token = auth_handler.encode_token(data['email'])
    return { 'token': token }


@app.get('/unprotected')
def unprotected():
    return { 'hello': 'world' }


@app.get('/protected')
def protected(username=Depends(auth_handler.auth_wrapper)):
    return { 'name': username }


@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    if not file:
        return {"message": "No upload file sent"}
    else:
        print('1111')
        file.file.seek(0)
        try:
            pdf_reader = PdfReader(file.file)
            print(pdf_reader)
            dictionary = pdf_reader.getFormTextFields()
            json_data = json.dumps(dictionary)
        except Exception as e:
            print(e)
        # resp = cloudinary.uploader.upload(file.file)

        return json_data

@app.post("/enqform")
async def enq_data( request: Request):
    body1 = await request.json()
    print(body1)
    body= body1['userinfo']
    # try:
    enq_id = secrets.token_hex(10)
    body['serviceInfo']['enq_id'] = enq_id
    data= models.IGS_ENQ_DATA(enq_id=enq_id , first_name = body['first_name'], last_name = body['last_name'], mobile = int(body["mobile"]), email = body["email"] , address=body['address'] , city=body['city'] , status = "In-Progress" , pincode = int(body["pincode"]), enquired_for = body["enquired_for"])
    db.add(data)
    db.flush()
    if body['enquired_for'] == "GST":
        srv  = models.IGS_ENQ_GST   (enq_id=body['serviceInfo']['enq_id'] , gst_time = body['serviceInfo']['gst_time'], period = list(body['serviceInfo']['period'].values())[0])
    elif body['enquired_for'] == "GST Registration":
        srv  = models.IGS_ENQ_GST_RGST(**body['serviceInfo'])
    elif body['enquired_for'] == "PAN Registration":
        srv  = models.IGS_ENQ_PAN_RGST(**body['serviceInfo'])
    elif body['enquired_for'] == "TAX Registration":
        srv  = models.IGS_ENQ_TAX(**body['serviceInfo'])
    db.add(srv)
    db.flush()
    db.commit() 
    # except Exception as e:
    #     print(e)

# {'userinfo': {'serviceInfo': {'period': {'month': '2023-05-01T04:00:00.000Z'}, 'gst_time': 'Monthly'}, 'fst_name': 'Vignesh', 'lst_name': 'Sivakumar', 'mobile': '7639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '609407', 'email': 'vignxs@gmail.com'639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '6639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '609407', 'email': 'vignxs@gmail.com', 'enquiredfor': 'GST'}}

    