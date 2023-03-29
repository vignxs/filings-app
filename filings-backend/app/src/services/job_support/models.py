
from sqlalchemy import  Column, Integer, String, DateTime, BigInteger, func, event, ForeignKey
from ...database import Base
from sqlalchemy.orm import relationship


class JOB_SUPPORT_PAYMENT(Base):
    __tablename__ = "JOB_SUPPORT_PAYMENT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    candidate_payment_amount = Column(Integer)
    candidate_payment_status = Column(String)
    candidate_payment_date = Column(DateTime, default=None)
    resource_payment_amount = Column(Integer)
    resource_payment_status = Column(String)
    resource_payment_date = Column(DateTime, default=None)
    payment1 = relationship("IGS_JOB_SUPPORT", back_populates="payment")


class JOB_SUPPORT_COMMENTS(Base):

    __tablename__ = "JOB_SUPPORT_COMMENTS"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey(
        "IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    comments = Column(String)
    commented_at = Column(DateTime, default=None)
    comments1 = relationship("IGS_JOB_SUPPORT", back_populates="comment")


class IGS_JOB_SUPPORT(Base):
    __tablename__ = "IGS_JOB_SUPPORT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    candidate_name = Column(String)
    mobile = Column(BigInteger)
    technology = Column(String)
    start_date = Column(String)
    followup_date = Column(String)
    resource = Column(String)
    status = Column(String)
    feedback = Column(String)
    created_by = Column(String)
    updated_by = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    payment_period = Column(String)
    date_of_enquiry = Column(String)
    charges = Column(Integer)
    payment = relationship("JOB_SUPPORT_PAYMENT")
    comment = relationship("JOB_SUPPORT_COMMENTS")

class JOB_SUPPORT_PAYMENT(Base):
    __tablename__ = "JOB_SUPPORT_PAYMENT"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey("IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    candidate_payment_amount = Column(Integer)
    candidate_payment_status = Column(String)
    candidate_payment_date = Column(DateTime, default=None)
    resource_payment_amount = Column(Integer)
    resource_payment_status = Column(String)
    resource_payment_date = Column(DateTime, default=None)

class JOB_SUPPORT_COMMENTS(Base):

    __tablename__ = "JOB_SUPPORT_COMMENTS"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, autoincrement=True,  index=True)
    job_support_id = Column(Integer, ForeignKey("IGS_JOB_SUPPORT.id", ondelete="CASCADE"))
    comments = Column(String)
    commented_at = Column(DateTime, default=None)

@event.listens_for(IGS_JOB_SUPPORT, 'before_update')
def before_update_listener(mapper, connection, target):
    target.updated_at = func.now()
