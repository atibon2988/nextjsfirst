"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tự động đóng menu khi chuyển trang
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (!mounted) return <div className="h-20" />;

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
    if (searchQuery.trim()) {
        // Luôn điều hướng về gốc (/) kèm theo query tìm kiếm
        window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
};

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl py-2 shadow-lg' 
        : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
        
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">AnyThink</span>
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
            <Link href="/about" className="hover:text-blue-600 transition">Giới thiệu</Link>
          </nav>
        </div>

        {/* SEARCH BAR (Logic lọc tại trang chủ) */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài nguyên..."
            className="w-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 focus:border-blue-500 rounded-full py-2 pl-10 pr-4 text-slate-900 dark:text-white outline-none transition-all"
          />
          <button type="submit" className="absolute left-3 top-2.5 text-slate-500 hover:text-blue-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-3">
          {/* DANH MỤC SỔ XUỐNG (Đầy đủ 6 mục yêu cầu) */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              <span>Danh mục</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 py-3 z-50 animate-in fade-in zoom-in duration-200">
                <Link href="/?cat=Tin tức" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">📰 Tin tức</Link>
                <Link href="/?cat=Game" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎮 Game</Link>
                <Link href="/?cat=Video" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎥 Video</Link>
                <Link href="/?cat=Ảnh" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🖼️ Ảnh</Link>
                <Link href="/?cat=Phần mềm" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">💻 Phần mềm</Link>
                <Link href="/?cat=Nhạc" className="block px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎵 Nhạc</Link>
              </div>
            )}
          </div>

          {/* NÚT DARKMODE */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 bg-blue-50 dark:text-white border bg-white/80 dark:bg-slate-900/80 transition-transform active:scale-90"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.01 8.01 0 0010.586 10.586z" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}