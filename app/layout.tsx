import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // Import Header vào

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kho Tài Nguyên Miễn Phí',
  description: 'Tải phần mềm, game, nhạc chất lượng cao.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      {/* Thêm dark:bg-slate-900 và dark:text-white */}
      <body className={`${inter.className} bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white transition-colors duration-300`}>
        <Header />
        {children}
      </body>
    </html>
  );
}