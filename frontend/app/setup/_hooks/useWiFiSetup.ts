'use client';

import { useState } from 'react';

interface SetupRequest {
  ssid: string;
  password?: string;
}

interface SetupResponse {
  status: string;
  detected_pc_ip: string;
}

export interface SetupStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function useWiFiSetup() {
  const [ssid, setSsid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<SetupStatus>({ type: null, message: '' });

  const sendSetup = async () => {
    if (!ssid.trim()) {
      alert('SSIDを入力してください．');
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const payload: SetupRequest = { ssid, password };
      
      // FastAPIのポート8000番へリクエストを送信します．
      const res = await fetch(`${process.env.API_URL}/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'シリアル送信に失敗しました．');
      }

      const data: SetupResponse = await res.json();
      
      setStatus({
        type: 'success',
        message: `✓ 初期設定の流し込みに成功しました！検出されたセントラルPCのローカルIP： ${data.detected_pc_ip}．マイコンの自動再起動を待っています．`,
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: `❌ エラーが発生しました： ${err.message || '通信エラー．'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    ssid,
    setSsid,
    password,
    setPassword,
    loading,
    status,
    sendSetup,
  };
}