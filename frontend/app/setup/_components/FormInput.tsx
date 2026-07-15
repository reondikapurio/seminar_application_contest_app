'use client';

interface FormInputProps {
  label: string;
  type: 'text' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
}: FormInputProps) {
  const inputId = `${label}-${type}`.replace(/\s+/g, '-');

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-semibold text-slate-300 mb-1">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
      />
    </div>
  );
}