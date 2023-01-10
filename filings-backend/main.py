import json
from typing import Union
import cloudinary
from PyPDF2 import PdfFileReader
from cloudinary import uploader
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
import yaml
from pathlib import Path
import models
from database import SessionLocal as db
from database import engine
import secrets
 
db  = db()

conf = yaml.safe_load(Path('config.yaml').read_text())
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)
# cloudinary.config(**conf['cloudinary_config'])




@app.post("/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    if not file:
        return {"message": "No upload file sent"}
    else:
        print('1111')
        file.file.seek(0)
        try:
            pdf_reader = PdfFileReader(file.file)
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
    body= body1['userinfo']
    print(body)
    enq_id = secrets.token_hex(10)
    
    data= models.IGS_ENQ_DATA(enq_id=enq_id , fst_name = body['fst_name'], lst_name = body['lst_name'], mobile_no = int(body["mobile"]), email = body["email"] , status = "In-Progress" , pincode = int(body["pincode"]), enq_for = body["enquiredfor"])
    db.add(data)
    db.flush()
    srv  = models.IGS_ENQ_GST(enq_id=enq_id , gst_time = body['serviceInfo']['gst_time'], period = list(body['serviceInfo']['period'].values())[0])
    db.add(srv)
    db.flush()
    db.commit()

# {'userinfo': {'serviceInfo': {'period': {'month': '2023-05-01T04:00:00.000Z'}, 'gst_time': 'Monthly'}, 'fst_name': 'Vignesh', 'lst_name': 'Sivakumar', 'mobile': '7639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '609407', 'email': 'vignxs@gmail.com'639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '6639290579', 'address': 'VDVAC', 'city': 'porayar', 'pincode': '609407', 'email': 'vignxs@gmail.com', 'enquiredfor': 'GST'}}
@app.post("/enqGST")
async def enq_data( request: Request):
    body = await request.json()
    body['enq_id'] = secrets.token_hex(10)
    data= models.IGS_ENQ_GST(**body)
    db.add(data)
    db.commit()
    