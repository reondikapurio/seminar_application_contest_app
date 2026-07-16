"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sun, Thermometer, Gauge } from "lucide-react";

interface DataPoint {
  lux: number | null;
  temperature: number | null;
  pressure: number | null;
  timestamp: string;
}

export default function RealTimeChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const host = typeof window !== "undefined" ? window.location.hostname : "localhost";
    const httpUrl = `http://${host}:8080/api/telemetry/history`;
    const wsUrl = `ws://${host}:8080/api/ws`;

    // 1．過去の履歴データの取得
    fetch(httpUrl)
      .then((res) => res.json())
      .then((historyData) => {
        setData(historyData);
      })
      .catch((err) => console.error("履歴データの取得に失敗しました:", err));

    // 2．WebSocketによるリアルタイムデータの受信
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const newPoint: DataPoint = JSON.parse(event.data);
      setData((prevData) => {
        const updated = [...prevData, newPoint];
        if (updated.length > 30) {
          updated.shift();
        }
        return updated;
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-80 bg-[#111827] rounded-2xl border border-slate-800 flex items-center justify-center">
        <span className="text-slate-400">ダッシュボードを読み込み中...</span>
      </div>
    );
  }

  // 最新の測定値を取得
  const latest = data.length > 0 ? data[data.length - 1] : { lux: 0, temperature: 0, pressure: 0 };

  return (
    <div className="w-full space-y-6">
      {/* 3連リアルタイムダッシュボード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ① 照度モニター（GY-30） */}
        <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="text-amber-400" size={20} />
              <h3 className="text-sm font-bold text-slate-200">周囲の照度</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-sky-400">
                {latest.lux !== null ? latest.lux.toFixed(1) : "---"}{" "}
                <span className="text-xs font-normal text-slate-400">lx</span>
              </span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="timestamp" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#38bdf8" }}
                />
                <Line
                  type="monotone"
                  dataKey="lux"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ② 温度モニター（BMP280） */}
        <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="text-rose-500" size={20} />
              <h3 className="text-sm font-bold text-slate-200">周囲の温度</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-rose-400">
                {latest.temperature !== null ? latest.temperature.toFixed(1) : "---"}{" "}
                <span className="text-xs font-normal text-slate-400">°C</span>
              </span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="timestamp" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#f43f5e" }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ③ 気圧モニター（BMP280） */}
        <div className="bg-[#111827] p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="text-emerald-500" size={20} />
              <h3 className="text-sm font-bold text-slate-200">大気圧</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400">
                {latest.pressure !== null ? latest.pressure.toFixed(1) : "---"}{" "}
                <span className="text-xs font-normal text-slate-400">hPa</span>
              </span>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="timestamp" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}