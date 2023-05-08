# Use an official Python runtime as a parent image
FROM python:3.11-slim-buster

WORKDIR /ehub-backend

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# Make port 80 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python3","main.py"]
