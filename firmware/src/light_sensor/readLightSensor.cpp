#include "readLightSensor.h"
#include "config.h"

#include <arduino.h>
#include <BH1750.h>

namespace light_sensor {
    float readLightSensor(BH1750 &lightMeter){
        float lux = lightMeter.readLightLevel();

        Serial.print("Light Level: ");
        Serial.print(lux);
        Serial.println(" lx");
        return lux;

        delay(1000);
    }
}