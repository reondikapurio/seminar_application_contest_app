from pydantic import BaseSettings


class settings(BaseSettings):
    SERiAL_BAUDRATE: int = 115200

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
    ]


settings = settings()
