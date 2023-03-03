import os
from sqlalchemy import create_engine 
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
#TODO USE ENV VAR FOR DB URL


###
# Database Configuration
###

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:12345@localhost:5432/fdb1"
# "postgresql://fhtbzqtj:A7--8_LfuRd0ngPY2itsOkFbn5Ehrmxu@rosie.db.elephantsql.com/fhtbzqtj"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base() 

# Each time you modify your SQLAlchemy models, 
# you should generate a new migration script using alembic revision --autogenerate 
# and then apply the migration using alembic upgrade head.