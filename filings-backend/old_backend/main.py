
from typing import Union
import cloudinary
from cloudinary import uploader
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import yaml
from pathlib import Path
from pdfminer.pdfparser import PDFParser
from pdfminer.psparser import PSLiteral  # edit: fixed typo
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdftypes import resolve1, PDFObjRef

conf = yaml.safe_load(Path('config.yaml').read_text())

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
        file.file.seek(0)
        # resp = cloudinary.uploader.upload(file.file)
        data = {}
        parser = PDFParser(file.file)
        doc = PDFDocument(parser)
        fields = resolve1(doc.catalog['AcroForm'])['Fields']
        for i in fields:
            field = resolve1(i)
            name, value = field.get('T'), field.get('V')
            if isinstance(name, PSLiteral):
                name = name.name

            if isinstance(value, PDFObjRef):
                value = resolve1(value)
                
            if isinstance(value, PSLiteral):
                value = value.name
            else:
                value = str(value, encoding='ISO-8859-1')
                
            data[name.decode('ascii')] = str(value)
        data_dict = {
            'First_name': data['Given Name Text Box'],
            'Last_name' : data['Family Name Text Box'],
            'House_no' : data['House nr Text Box'],
            'Address' : data['Address 1 Text Box'],
            'Post_Code' : data['Postcode Text Box'],
            'Country' : data['Country Combo Box'],
            'City' : data['City Text Box'],
            'Favorite_color' : data['Family Name Text Box'],
            'Driving_Licence' : data['Driving License Check Box'],
        }
        return data_dict
