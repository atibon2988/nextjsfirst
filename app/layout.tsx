// Trong file app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {/* pt-28 giúp đẩy nội dung xuống dưới Header 1 khoảng 112px */}
          <main className="pt-24 md:pt-32 min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}