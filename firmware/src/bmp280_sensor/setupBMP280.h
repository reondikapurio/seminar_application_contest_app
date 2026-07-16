#ifndef SETUP_BMP280_H
#define SETUP_BMP280_H

#include <Adafruit_BMP280.h>

namespace bmp280_sensor {
// もとの setupLightSensor(lightMeter) と同様に，インスタンスへの参照を受け取ります．
bool setupBMP280(Adafruit_BMP280 &bmp);
}

#endif