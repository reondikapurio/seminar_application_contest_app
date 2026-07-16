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

        void sendDataToCentralPc(const float lux);

    private:
        Preferences _preferences;
        DeviceConfig _deviceConfig;
        bool _isSetUpModeFlag = false;

        bool _loadConfig();
        void _saveConfig(const DeviceConfig& config);
        void _connectWifi();
};
}