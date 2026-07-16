#include <Arduino.h>
#include <BH1750.h>
#include <Adafruit_BMP280.h> // ★ BMP280のライブラリを追加

#include "config.h"
#include "touch_sensor/touch_sensor.h"
#include "light_sensor/setupLightSensor.h"
#include "light_sensor/readLightSensor.h"
#include "bmp280_sensor/setupBMP280.h"      // ★ 追加
#include "bmp280_sensor/readBMP280.h"       // ★ 追加
#include "network_manager/networkManager.h"

BH1750 lightMeter;
Adafruit_BMP280 bmp; // ★ BMP280のグローバルインスタンスを宣言
network_manager::NetworkManager networkManager;

void setup() {
  Serial.begin(config::SERIAL_BAUD);
  delay(2000);

  Serial.println("\n=================================");
  Serial.println("  ESP32-S3 Modular IoT Platform  ");
  Serial.println("=================================");

  // ★ ここで物理的なI2Cピンを明示してI2Cバスを初期化します．
  // これにより、BH1750とBMP280の両方がこのピン定義を安全に共有します．
  Wire.begin(config::I2C_SDA, config::I2C_SCL); 

  light_sensor::setupLightSensor(lightMeter);
  bmp280_sensor::setupBMP280(bmp); // ★ ここで上の Wire を使ってセンサーと接続します．

  networkManager.begin();
}

void loop() {
  if(networkManager.isSetUpMode()){
    networkManager.handleSerialSetup();
  }else{
    // 各センサーモジュールからデータを安全に読み込みます．
    float lux = light_sensor::readLightSensor(lightMeter);
    float temp = bmp280_sensor::readTemperature(bmp); // ★ 追加
    float press = bmp280_sensor::readPressure(bmp);    // ★ 追加

    // 拡張した送信関数に3つのデータを乗せて、サーバー（8080ポート）にPOSTします．
    networkManager.sendDataToCentralPc(lux, temp, press);
  }

  delay(config::LOOP_DELAY_MS);
}