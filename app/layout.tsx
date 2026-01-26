import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header'; // Import Header vào

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kho Tài Nguyên Miễn Phí',
  description: 'Tải phần mềm, game, nhạc chất lượng cao.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Đặt Header ở đây -> Mọi trang đều sẽ thấy nó */}
        <Header />
        
        {/* children chính là nội dung thay đổi của từng trang (Trang chủ, Chi tiết...) */}
        {children}
      </body>
    </html>
  );
}