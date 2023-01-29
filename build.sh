#!/bin/bash
# . .\\filings\\Scripts\\activate
# echo "Venv activated"

# # pip install  -r requirements.txt
# echo "All the dependancies have been installed"

echo "Starting services..."
cd filings-backend
uvicorn main:app --reload --port 8000 > ../app_logs/uvicorn.log &

echo "Starting Application..."
cd ../filings-frontend

# npm i > ../app_logs/npmstart.log &

npm start > ../app_logs/npmstart.log &

echo "Build Completed Sucesssfully."