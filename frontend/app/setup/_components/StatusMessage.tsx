'use client';

import { SetupStatus } from '../_hooks/useWiFiSetup';

interface StatusMessageProps {
  status: SetupStatus;
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (!status.type) return null;

  const isSuccess = status.type === 'success';

  return (
    <div
      className={`mt-4 text-xs font-medium p-3 rounded-lg border ${
        isSuccess
          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
          : 'bg-rose-950/80 text-rose-300 border-rose-800'
      }`}
    >
      {status.message}
    </div>
  );
}