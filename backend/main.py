

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# 作成したモジュールからインポートします
from api import api_router
from core.database import engine, Base


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Central IoT Platform",
    description="ESP32-S3のセットアップおよびデータ受信用のローカルAPIサーバーです．",
    version="1.0.0"
)

# フロントエンド（Next.js）からのアクセスを許可するCORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(api_router.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}