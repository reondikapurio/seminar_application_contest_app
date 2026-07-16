#pragma once
#include <arduino.h>

namespace config {
    constexpr uint8_t TOUCH_PIN = 4;

    constexpr uint32_t TOUCH_THRESHOLD = 30000;

    constexpr uint8_t I2C_SDA = 5;
    constexpr uint8_t I2C_SCL = 6;

    constexpr uint32_t SERIAL_BAUD = 115200;
    constexpr uint32_t LOOP_DELAY_MS = 1000;

    constexpr uint16_t SERVER_PORT = 8000;
}