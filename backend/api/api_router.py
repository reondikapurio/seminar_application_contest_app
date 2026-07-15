from fastapi import APIRouter


router = APIRouter(
    prefix="/api",
    tags=["api"],
    dependencies=[],
    # responsesはdocs用で返す可能性のあるエラーコードを記載する
    # 200系は勝手に追加されるので、404などのエラーコードを記載する
    responses={404: {"description": "Not found"}},
)
