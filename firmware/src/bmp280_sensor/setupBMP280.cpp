#include "setupBMP280.h"
#include <Wire.h>
#include "config.h" // 共通設定ファイルをインポート

namespace bmp280_sensor {
bool setupBMP280(Adafruit_BMP280 &bmp) {
    // ★ 最重要：BMP280センサーとの通信を開始します．
    // 接続に失敗した場合は、速やかに false を返してエラーを検知させます．
    if (!bmp.begin(0x76)) { 
        Serial.println("[エラー] BMP280センサーが見つかりませんでした．配線やSDOピンの接続を確認してください．");
        return false;
    }

    // 測定フィルタパラメータの設定
    bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,
                    Adafruit_BMP280::SAMPLING_X2,
                    Adafruit_BMP280::SAMPLING_X16,
                    Adafruit_BMP280::FILTER_X16,
                    Adafruit_BMP280::STANDBY_MS_500);
    
    Serial.println("[初期化] BMP280センサーが正常に起動しました．");
    return true;
}
}