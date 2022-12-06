
from typing import Union
import cloudinary
from cloudinary import uploader
from fastapi import FastAPI, File, UploadFile
import yaml
from pathlib import Path

conf = yaml.safe_load(Path('config.yaml').read_text())

app = FastAPI()
cloudinary.config(**conf['cloudinary_config'])

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    if not file:
        return {"message": "No upload file sent"}
    else:
        file.file.seek(0)
        resp = cloudinary.uploader.upload(file.file)

        return resp


