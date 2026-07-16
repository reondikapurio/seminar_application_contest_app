import datetime
from sqlalchemy import Column, Integer, Float, DateTime
from core.database import Base

class Telemetry(Base):
    __tablename__ = "telemetry"

    id = Column(Integer, primary_key=True, index=True)
    lux = Column(Float, nullable=True)          # GY-30 照度
    temperature = Column(Float, nullable=True)  # BMP280 温度
    pressure = Column(Float, nullable=True)     # BMP280 気圧
    timestamp = Column(DateTime, default=datetime.datetime.now)