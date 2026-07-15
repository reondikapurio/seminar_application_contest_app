"use client";

import React from 'react';
import { useWiFiSetup } from '../_hooks/useWiFiSetup';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import StatusMessage from './StatusMessage';

export default function WiFiSetupForm() {
  const { ssid, setSsid, password, setPassword, loading, status, sendSetup } = useWiFiSetup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendSetup();
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl max-w-md w-full">
      <h2 className="text-xl font-bold mb-2 text-teal-300 flex items-center gap-2">
        ⚙️ Wi-Fiプロビジョニング
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        ESP32-S3デバイスをUSBでこのPCに接続した状態で，ネットワーク情報を流し込んでください．
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Wi-Fi SSID"
          type="text"
          value={ssid}
          onChange={setSsid}
          disabled={loading}
          required={true}
          placeholder="例： MyHome_WiFi"
        />

        <FormInput
          label="Wi-Fi パスワード"
          type="password"
          value={password}
          onChange={setPassword}
          disabled={loading}
          required={false}
          placeholder="••••••••"
        />

        <SubmitButton loading={loading}>USB経由でデバイスを初期設定する</SubmitButton>
      </form>

      <StatusMessage status={status} />
    </div>
  );
}