#ifndef READ_BMP280_H
#define READ_BMP280_H

#include <Adafruit_BMP280.h>

namespace bmp280_sensor {
float readTemperature(Adafruit_BMP280 &bmp);
float readPressure(Adafruit_BMP280 &bmp);
}

#endif