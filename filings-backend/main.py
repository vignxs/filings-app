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
cloudinary.config(**conf['cloudinary_config'])




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
        resp = cloudinary.uploader.upload(file.file)

        return json_data

@app.post("/enqform")
async def enq_data( request: Request):
    body = await request.json()
    body['enq_id'] = secrets.token_hex(10)
    data= models.IGS_ENQ_DATA(**body)
    db.add(data)
    db.commit()

@app.post("/enqGST")
async def enq_data( request: Request):
    body = await request.json()
    body['enq_id'] = secrets.token_hex(10)
    data= models.IGS_ENQ_GST(**body)
    db.add(data)
    db.commit()
    