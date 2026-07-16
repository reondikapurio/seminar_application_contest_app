from fastapi import APIRouter
from api.endpoints import setup
from api.endpoints import telemetry
from api.endpoints import websocket

router = APIRouter(
    prefix="/api",
    tags=["api"],
    dependencies=[],
    # responsesはdocs用で返す可能性のあるエラーコードを記載する
    # 200系は勝手に追加されるので、404などのエラーコードを記載する
    responses={404: {"description": "Not found"}},
)

router.include_router(setup.router)
router.include_router(telemetry.router)
router.include_router(websocket.router)