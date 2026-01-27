import './globals.css';
import Header from './components/Header';
import { Providers } from './providers'; // PHẢI có dấu ngoặc nhọn này

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 text-slate-900 dark:text-slate-100">
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