import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Central IoT Platform',
  description: 'Decentralized IoT Management Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${inter.className} bg-slate-900 text-slate-100 flex flex-col min-h-screen antialiased`}>
        {/* 共通ヘッダー */}
        <Header />
        
        {/* メインコンテンツエリア */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        {/* 共通フッター */}
        <Footer />
      </body>
    </html>
  );
}