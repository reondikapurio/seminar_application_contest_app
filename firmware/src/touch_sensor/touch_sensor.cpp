#include <Arduino.h>
#include "touch_sensor.h"
#include "config.h"

namespace touch_sensor {
    void initTouchSensor(){
        Serial.begin(config::SERIAL_BAUD);
        delay(2000);
    }

    bool isTouched(){
        int rawValue = touchRead(config::TOUCH_PIN);
        
        Serial.print("Raw Touch Value:");
        Serial.print(rawValue);
        Serial.print("|");

        if(rawValue < config::TOUCH_THRESHOLD){
            return true;
        }
        return false;
    }
}