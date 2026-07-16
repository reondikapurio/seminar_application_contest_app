#include "readBMP280.h"

namespace bmp280_sensor {
float readTemperature(Adafruit_BMP280 &bmp) {
    return bmp.readTemperature(); // 単位: °C
}

float readPressure(Adafruit_BMP280 &bmp) {
    return bmp.readPressure() / 100.0F; // Pa から hPa に変換
}
}