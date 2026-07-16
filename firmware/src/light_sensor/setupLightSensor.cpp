#include "setupLightSensor.h"
#include "config.h"

#include <arduino.h>
#include <Wire.h>
#include <BH1750.h>

namespace light_sensor {
    void setupLightSensor(BH1750 &lightMeter){
        delay(2000);    

        Serial.println("====== Light sensor initialized ======");
        
        Wire.begin(config::I2C_SDA, config::I2C_SCL);

        if (!lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
            Serial.println(" SUCCESS: 照度センサーの初期化に成功しました。");
        } else {
            Serial.println(" ERROR: 照度センサーの初期化に失敗しました。");
        }
    }
}