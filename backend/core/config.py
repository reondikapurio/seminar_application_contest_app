from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SERIAL_BAUDRATE: int = 115200

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
    ]


settings = Settings()
