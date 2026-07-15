from pydantic import BaseModel, Field, field_validator, IPvAnyAddress
import ipaddress

class SetupWiFiSchema(BaseModel):
    """
    セットアップエンドポイント用のスキーマ
    """
    ssid : str = Field(min_length=1, max_length=32)
    password : str = Field(min_length=0, max_length=64)

    @field_validator("ssid")
    @classmethod
    def validate_ssid(cls, v: str) -> str:
        v = v.strip()
        if len(v.encode("utf-8")) > 32:
            raise ValueError("SSIDは32バイト以内である必要があります。")
        if any(ch in v for ch in [",", "\n", "\r"]):
            raise ValueError("SSIDにカンマや改行は使用できません。")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        v = v.strip()
        if len(v.encode("utf-8")) > 64:
            raise ValueError("パスワードは64バイト以内である必要があります。")
        if any(ch in v for ch in [",", "\n", "\r"]):
            raise ValueError("パスワードにカンマや改行は使用できません。")
        return v
    
class SendConfigSchema(SetupWiFiSchema):
    """
    シリアル通信エンドポイント用のスキーマ
    """
    pc_ip: IPvAnyAddress = Field(..., description="PCのIPアドレス")

    @field_validator("pc_ip")
    @classmethod
    def validate_pc_ip(cls, v: IPvAnyAddress) -> IPvAnyAddress:
        try:
            ipaddress.ip_address(str(v))
        except ValueError:
            raise ValueError("有効なIPアドレスを入力してください。")
        return v