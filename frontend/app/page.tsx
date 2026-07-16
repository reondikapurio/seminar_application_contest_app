"use client"; // ★ 先頭にこの1行を追加します

import dynamic from "next/dynamic";

// RealTimeChart を SSR無効で動的にインポートします．
const RealTimeChart = dynamic(() => import("./_components/RealTimeChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 bg-[#111827] rounded-2xl border border-slate-800 flex items-center justify-center">
      <span className="text-slate-400">グラフを読み込み中...</span>
    </div>
  ),
});

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-8 flex flex-col items-center justify-center gap-8">
      {/* 既存のWi-Fiセットアップコンポーネント */}
      <div className="w-full max-w-2xl">
        {/* ここに既存の <WifiSetupForm /> などを配置 */}
      </div>

      {/* リアルタイムグラフの追加 */}
      <div className="w-full max-w-2xl">
        <RealTimeChart />
      </div>
    </main>
  );
}