from fastapi import APIRouter

from service.setup import setup_wifi_service
from schemas.setup import SetupWiFiSchema

router = APIRouter(
    prefix="/setup",
    tags=["setup"],
)

@router.post("/")
async def setup_wifi(request: SetupWiFiSchema):
    """
    WiFiのセットアップを行うエンドポイント
    """
    data = setup_wifi_service(request)
    return data