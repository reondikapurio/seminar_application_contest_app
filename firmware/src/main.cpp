#include <Arduino.h>
#include <BH1750.h>

#include "config.h"
#include "touch_sensor/touch_sensor.h"
#include "light_sensor/setupLightSensor.h"
#include "light_sensor/readLightSensor.h"
#include "network_manager/networkManager.h"

BH1750 lightMeter;
network_manager::NetworkManager networkManager;

void setup() {
  Serial.begin(config::SERIAL_BAUD);
  delay(2000);

  Serial.println("\n=================================");
  Serial.println("  ESP32-S3 Modular IoT Platform  ");
  Serial.println("=================================");

  light_sensor::setupLightSensor(lightMeter);

  networkManager.begin();
}

void loop() {
  if(networkManager.isSetUpMode()){
    networkManager.handleSerialSetup();
  }else{
    float lux = light_sensor::readLightSensor(lightMeter);
    networkManager.sendDataToCentralPc(lux);
  }

  delay(config::LOOP_DELAY_MS);

}
