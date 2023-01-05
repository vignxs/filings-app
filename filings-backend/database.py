from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://us6jdoy4bty55rkxuxfy:CdMQ4MFVsCLX9VB9JB5z@bsjbabyk9rw6rua836mk-postgresql.services.clever-cloud.com:5432/bsjbabyk9rw6rua836mk"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base() 