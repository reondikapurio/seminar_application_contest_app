import json
from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.database import get_db
from core.connection_manager import manager
from models.telemetry import Telemetry

router = APIRouter(
    prefix="/telemetry",
    tags=["telemetry"],
)

# 複数のセンサーからのデータを許容する柔軟なPydanticスキーマです．
class TelemetrySchema(BaseModel):
    lux: Optional[float] = None
    temperature: Optional[float] = None
    pressure: Optional[float] = None

@router.post("")
async def receive_telemetry(data: TelemetrySchema, db: Session = Depends(get_db)):
    # 1．データベースに新規保存
    db_telemetry = Telemetry(
        lux=data.lux,
        temperature=data.temperature,
        pressure=data.pressure
    )
    db.add(db_telemetry)
    db.commit()
    db.refresh(db_telemetry)

    # 2．リアルタイム送信用Payloadの構築
    payload = {
        "lux": db_telemetry.lux,
        "temperature": db_telemetry.temperature,
        "pressure": db_telemetry.pressure,
        "timestamp": db_telemetry.timestamp.strftime("%H:%M:%S")
    }
    
    # 3．WebSocket経由で全ブラウザに一斉配信
    await manager.broadcast(json.dumps(payload))
    
    return {"status": "success", "data": payload}

@router.get("/history")
def get_telemetry_history(db: Session = Depends(get_db)):
    # 直近50件のデータを取得し，時系列順にして返します．
    history = db.query(Telemetry).order_by(Telemetry.id.desc()).limit(50).all()
    return [
        {
            "lux": item.lux,
            "temperature": item.temperature,
            "pressure": item.pressure,
            "timestamp": item.timestamp.strftime("%H:%M:%S")
        }
        for item in reversed(history)
    ]