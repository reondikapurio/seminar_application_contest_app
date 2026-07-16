#include <arduino.h>
#include <BH1750.h>

namespace light_sensor {
    float readLightSensor(BH1750 &lightMeter);
}