import WiFiSetupForm from './_components/WiFiSetupForm';

export default function SetupPage() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md text-center mb-6">
        <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-400">
          Setup Wizard
        </span>
        <h2 className="text-2xl font-extrabold mt-3 text-slate-100">
          デバイスの初期セットアップ
        </h2>
      </div>

      <WiFiSetupForm />
    </div>
  );
}