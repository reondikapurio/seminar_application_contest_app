'use client';

import type { ReactNode } from 'react';

interface SubmitButtonProps {
  children: ReactNode;
  loading: boolean;
  disabled?: boolean;
}

export default function SubmitButton({
  children,
  loading,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm shadow-lg shadow-teal-900/20 flex justify-center items-center"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></span>
          処理中...
        </span>
      ) : (
        children
      )}
    </button>
  );
}