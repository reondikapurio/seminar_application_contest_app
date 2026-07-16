#ifndef NETWORK_MANAGER_H
#define NETWORK_MANAGER_H

#include <Arduino.h>
#include <Preferences.h>

namespace network_manager {
struct DeviceConfig {
    String ssid;
    String password;
    String centralPcIp;
};

class NetworkManager {
    public:
        NetworkManager() = default;

        void begin();

        bool isSetUpMode();

        void handleSerialSetup();

        // ★ 引数に temperature と pressure を追加します
        void sendDataToCentralPc(const float lux, const float temperature, const float pressure);

    private:
        Preferences _preferences;
        DeviceConfig _deviceConfig;
        bool _isSetUpModeFlag = false;

        bool _loadConfig();
        void _saveConfig(const DeviceConfig& config);
        void _connectWifi();
};
}

#endif // NETWORK_MANAGER_H