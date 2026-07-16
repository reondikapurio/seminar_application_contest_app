from pydantic import BaseModel


class TelemetrySchema(BaseModel):
    lux: float