import socket
import time  # 💡 【追加】ウェイト処理用のモジュール
import serial
import serial.tools.list_ports
from fastapi import HTTPException

from schemas.setup import SendConfigSchema
from core.config import settings
from core.logger import log
from schemas.setup import SetupWiFiSchema

def get_local_ip():
    """PC自身のIPアドレスを取得する関数"""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()

    log.info(f"Local IP Address: {ip}")
    return ip

def send_config_to_serial(data: SendConfigSchema):
    """
    シリアル通信でWiFi設定を送信する関数
    ESP32が接続されているCOMポートを自動で検出し、WiFi設定を送信します。
    """
    ports = list(serial.tools.list_ports.comports())
    if not ports:
        raise HTTPException(
            status_code=500,
            detail="シリアルポートが見つかりません。ESP32が接続されていることを確認してください。",
        )
    
    preferred = next(
        (p.device for p in ports if "CH34" in p.description or "USB" in p.description),
        None,
    )

    candidate_ports = []
    if preferred:
        candidate_ports.append(preferred)
    candidate_ports.extend([p.device for p in ports if p.device != preferred])

    last_error: Exception | None = None
    for target_port in candidate_ports:
        try:
            with serial.Serial(target_port, settings.SERIAL_BAUDRATE, timeout=1) as ser:
                # 💡 【重要】ESP32-S3の通信を確立するためにDTRとRTSをTrueにします．
                ser.dtr = True
                ser.rts = True
                
                # 💡 【重要】シリアルラインが電気的に安定するまで0.1秒だけ待ちます．
                time.sleep(0.1)
                
                # SSID, password, PCのIPアドレスをカンマ区切り + 改行で送信
                payload = f"{data.ssid},{data.password},{data.pc_ip}\n"
                ser.write(payload.encode("utf-8"))
                log.info(f"[SERIAL SEND] Port: {target_port}, SSID: {data.ssid}, PC_IP: {data.pc_ip}")
                return target_port
        except Exception as e:
            last_error = e

    raise HTTPException(status_code=500, detail=f"シリアル通信エラー: {last_error!s}")


def setup_wifi_service(data: SetupWiFiSchema):
    """
    WiFiのセットアップを行う関数
    @param data: SetupWiFiSchema
    @return: dict
    """
    local_ip = get_local_ip()
    log.info(f"[API REQUEST] Setup WiFi started. SSID: {data.ssid}, PC_IP: {local_ip}")
    
    config_data = SendConfigSchema.model_validate({
        "ssid": data.ssid,
        "password": data.password,
        "pc_ip": local_ip
    })

    used_port = send_config_to_serial(config_data)

    return {"status": "success",
            "detected_pc_ip": local_ip,
            "used_serial_port": used_port}