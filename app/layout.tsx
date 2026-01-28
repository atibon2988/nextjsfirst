import './globals.css';
import Header from './components/Header';
import { Providers } from './providers'; 
import type { Metadata } from 'next'; // Import type Metadata

// --- KHAI BÁO METADATA TẠI ĐÂY ---
export const metadata: Metadata = {
  title: {
    template: '%s | AnyThink', // Các trang con sẽ hiện: "Tên trang | AnyThink"
    default: 'AnyThink - Kho Tài Nguyên & Kiến Thức Miễn Phí', // Trang chủ hiện dòng này
  },
  description: 'Chia sẻ phần mềm, game, tài liệu và kiến thức công nghệ chất lượng cao.',
  
  // Cấu hình Icon (Favicon)
  icons: {
    icon: '/logo.png',        // Đường dẫn ảnh trong thư mục public
    shortcut: '/logo.png',    // Icon cho shortcut
    apple: '/logo.png',       // Icon cho Apple devices
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
          <Header />
          <main className="pt-24 md:pt-32 min-h-screen container mx-auto px-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}