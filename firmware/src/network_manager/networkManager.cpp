#include "networkManager.h"
#include "config.h"

#include <WiFi.h>
#include <HTTPClient.h>

namespace network_manager {
    void NetworkManager::begin(){
        if(!_loadConfig()){
            _isSetUpModeFlag = true;
            Serial.println("[セットアップモード] 設定が読み込めないため、セットアップモードに入ります。");
        }else {
            _isSetUpModeFlag = false;
            Serial.println("[通常モード] 設定が読み込めました。Wi-Fiに接続します。");
            _connectWifi();

            if(WiFi.status() != WL_CONNECTED){
                Serial.println("[エラー] Wi-Fiに接続できませんでした。セットアップモードに入ります。");
                _isSetUpModeFlag = true;
            }
        }
    }

    bool NetworkManager::isSetUpMode() {
        return _isSetUpModeFlag;
    }

    bool NetworkManager::_loadConfig(){
        _preferences.begin("iot_config", true);
        _deviceConfig.ssid = _preferences.getString("ssid", "");
        _deviceConfig.password =_preferences.getString("password", "");
        _deviceConfig.centralPcIp = _preferences.getString("centralPcIp", "");
        _preferences.end();

        return (!_deviceConfig.ssid.isEmpty() && !_deviceConfig.password.isEmpty() && !_deviceConfig.centralPcIp.isEmpty());
    }

    void NetworkManager::_saveConfig(const DeviceConfig& config){
        _preferences.begin("iot_config", false);
        _preferences.putString("ssid", config.ssid);
        _preferences.putString("password", config.password);
        _preferences.putString("centralPcIp", config.centralPcIp);
        _preferences.end();

        Serial.println("[設定保存] フラッシュメモリへの設定が保存されました。");
    }

    void NetworkManager::handleSerialSetup(){
        if(Serial.available() > 0 ){
            String input = Serial.readStringUntil('\n');
            input.trim();

            if(input.length() == 0){
                return;
            }

            int first_comma = input.indexOf(',');
            int second_comma = input.indexOf(',', first_comma + 1);

            if(first_comma == -1 || second_comma == -1){
                Serial.println("[エラー] 入力形式が不正です。正しい形式は「SSID,PASSWORD,CENTRAL_PC_IP」です。");
                return;
            }

            DeviceConfig config{input.substring(0, first_comma), input.substring(first_comma + 1, second_comma), input.substring(second_comma + 1)};
            _saveConfig(config);

            Serial.println("[設定完了] 設定が保存されました。デバイスを再起動します。");
            delay(3000);
            ESP.restart();  
        }
    }

    void NetworkManager::_connectWifi(){
        Serial.print("[Wi-Fi接続開始] SSID: ");
        Serial.println(_deviceConfig.ssid);

        WiFi.begin(_deviceConfig.ssid.c_str(), _deviceConfig.password.c_str());

        // Wi-Fi接続が確立するまで待機, 最大5秒まで待機
        int attempts = 0;
        while (WiFi.status() != WL_CONNECTED && attempts < 10){
            delay(500);
            Serial.print(".");
            attempts++;
        }

        if(WiFi.status() == WL_CONNECTED){
            Serial.println("\n[Wi-Fi接続成功] IPアドレス: " + WiFi.localIP().toString());
        }else{
            Serial.println("\n[Wi-Fi接続失敗] Wi-Fiに接続できませんでした。設定を確認してください。");
        }
    }

    // ★ 引数を拡張し、温度と気圧をJSONに乗せて送信します
    void NetworkManager::sendDataToCentralPc(const float lux, const float temperature, const float pressure){
        if(WiFi.status() != WL_CONNECTED){
            Serial.println("[エラー] Wi-Fiに接続されていません。データを送信できません。");
            WiFi.reconnect();
            return;
        }

        HTTPClient http;
        String url = "http://" + _deviceConfig.centralPcIp + ":" + String(config::SERVER_PORT) + "/api/telemetry";
        
        http.begin(url);
        http.addHeader("Content-Type", "application/json");

        // ★ nan（非数）や異常値を検知して，安全な JSON 表現である "null" に置き換えます．
        String luxStr = (isnan(lux) || lux < 0.0) ? "null" : String(lux, 1);
        String tempStr = isnan(temperature) ? "null" : String(temperature, 1);
        String pressStr = isnan(pressure) ? "null" : String(pressure, 1);

        String payload = "{\"lux\":" + luxStr + 
                         ",\"temperature\":" + tempStr + 
                         ",\"pressure\":" + pressStr + "}";
        
        int http_status_code = http.POST(payload);

        Serial.print("➜ [HTTP POST] " + url + " | " + payload);
        if (http_status_code > 0) {
            Serial.println(" | Response: " + String(http_status_code) + " | " + http.getString());
        } else {
            Serial.println(" | ❌ Error: " + http.errorToString(http_status_code));
        }
        http.end();
    }
}