import './globals.css';
import Header from './components/Header';
import { Providers } from './providers'; // Import Providers bạn vừa tạo

export const metadata = {
  title: 'AnyThink - Kho Tài Nguyên',
  description: 'Kho tải phần mềm, game và tài liệu miễn phí',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Providers>
          <Header />
          {/* pt-24 giúp đẩy nội dung xuống dưới Header không bị đè */}
          <main className="pt-24 md:pt-32 min-h-screen">
            {children}
          </main>
          {/* <Footer /> - Thêm vào nếu bạn đã có file Footer */}
        </Providers>
      </body>
    </html>
  );
}