import './globals.css';
import Header from './components/Header';
import { Providers } from './providers'; 
import type { Metadata } from 'next'; // Import type Metadata
import { Suspense } from 'react';
// --- KHAI BÁO METADATA TẠI ĐÂY ---
export const metadata: Metadata = {
  title: {
    template: '%s | AnyThink', // Các trang con sẽ hiện: "Tên trang | AnyThink"
    default: 'AnyThink - Kho Tài Nguyên & Kiến Thức Miễn Phí', // Trang chủ hiện dòng này
  },
  description: 'Chia sẻ phần mềm, game, tài liệu và kiến thức công nghệ chất lượng cao.',
  
  // Cấu hình Icon (Favicon)
icons: {
    icon: [
      { url: '/logo.png' },
      // Nếu bạn có file ảnh kích thước nhỏ hơn, có thể khai báo thêm (không bắt buộc)
      // { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      // { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      // Icon cho iPhone/iPad nên là hình vuông, kích thước khoảng 180x180
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // Các thông tin khác (SEO)
  openGraph: {
    title: 'AnyThink - Kho Tài Nguyên',
    description: 'Tải phần mềm, game và tài liệu miễn phí.',
    siteName: 'AnyThink',
    images: [
      {
        url: '/logo.png', // Ảnh hiển thị khi share link lên Facebook/Zalo
        width: 800,
        height: 800,
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ... (Phần code bên dưới giữ nguyên)
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Providers>
					<Suspense fallback={<div className="h-16 w-full bg-slate-900/50 animate-pulse fixed top-0 z-50" />}>
            <Header />
          </Suspense>
          <main className="pt-24 md:pt-32 min-h-screen container mx-auto px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}