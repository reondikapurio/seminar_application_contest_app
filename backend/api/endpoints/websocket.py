from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from core.connection_manager import manager

router = APIRouter(
    tags=["websocket"],
    responses={404: {"description": "Not found"}},
)

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # 切断検知のため待機状態を維持します
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)