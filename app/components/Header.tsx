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
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);  
  const { theme, setTheme } = useTheme();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load lịch sử từ máy người dùng khi mở web
    const saved = localStorage.getItem('search_history');
    if (saved) setSearchHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (query: string) => {
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
  };


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


  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState({ temp: "--", city: "Hà Nội" });

  useEffect(() => {
    // 1. Cập nhật đồng hồ mỗi phút
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);

    // 2. Lấy thời tiết thực tế (Dùng OpenWeatherMap API)
    const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Thay mã của bạn vào đây
    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&appid=${API_KEY}`);
        const data = await res.json();
        if (data.main) {
          setWeather({ temp: Math.round(data.main.temp).toString(), city: "Hà Nội" });
        }
      } catch (error) {
        console.error("Lỗi lấy thời tiết:", error);
      }
    };

    fetchWeather();
    return () => clearInterval(timer);
  }, []);
  const navLinkStyle = "relative py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors";

  if (!mounted) return <div className="h-20" />;

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
    if (searchQuery.trim()) {
      // Lưu lịch sử (không lưu trùng, tối đa 5 mục gần nhất)
      const newHistory = [
        searchQuery, 
        ...searchHistory.filter(h => h !== searchQuery)
      ].slice(0, 5);
      
      setSearchHistory(newHistory);
      localStorage.setItem('search_history', JSON.stringify(newHistory));
      
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };


  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 dark:bg-slate-900/10 backdrop-blur-md py-2 shadow-sm border-b border-white/5' 
        : 'bg-white/5 dark:bg-slate-900/5 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
        
        {/* 1. LOGO & TÊN (NGOÀI CÙNG BÊN TRÁI) */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`h-20 w-auto transition-all duration-500 ${
              theme === 'dark' ? 'invert brightness-0' : 'brightness-0'
            }`} 
          />
          <span className="text-xl font-bold text-slate-900 dark:text-white transition-colors">
            AnyThink
          </span>
        </Link>

        
        {/* KHỐI THÔNG TIN TỰ ĐỘNG */}
        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-300/30 dark:border-slate-700/30">
          <div className="flex flex-col text-[10px] font-bold uppercase tracking-tighter text-slate-500">
            <span className="text-slate-900 dark:text-slate-200">{weather.city}</span>
            <span className="font-medium opacity-70">{currentTime}</span>
          </div>
          <div className="text-lg font-light text-blue-500 dark:text-blue-400">
            {weather.temp !== "--" ? `${weather.temp}°` : "--°"}
          </div>
        </div>
      </div>

        {/* 2. KHỐI CĂN PHẢI */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          
        {/* TÌM KIẾM CÓ LỊCH SỬ */}
          <form onSubmit={handleSearch} className="relative hidden md:block w-full max-w-[200px] lg:max-w-[250px] group/search">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full bg-white/5 dark:bg-black/20 border border-slate-300/20 dark:border-slate-700/20 backdrop-blur-sm rounded-full py-1.5 pl-9 pr-4 text-sm text-slate-900 dark:text-white outline-none focus:bg-white/10 transition-all"
            />
            <button type="submit" className="absolute left-3 top-2 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            
            {/* TOOLTIP HIỆN LỊCH SỬ KHI RÊ CHUỘT VÀO Ô TÌM KIẾM */}
            {searchHistory.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 opacity-0 invisible group-focus-within/search:opacity-100 group-focus-within/search:visible transition-all z-50">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">Gần đây</div>
                {searchHistory.map((h, i) => (
                  <button 
                    key={i} 
                    onClick={() => window.location.href = `/?search=${encodeURIComponent(h)}`}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                  >
                    🕒 {h}
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* TRANG CHỦ */}
          <Link href="/" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>
            Trang chủ
          </Link>

          {/* DANH MỤC */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition"
            >
              <span>Danh mục</span>
              <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-3 z-50">
                <Link href="/?cat=Tin tức" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">📰 Tin tức</Link>
                <Link href="/?cat=Game" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎮 Game</Link>
                <Link href="/?cat=Video" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎥 Video</Link>
                <Link href="/?cat=Ảnh" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🖼️ Ảnh</Link>
                <Link href="/?cat=Phần mềm" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">💻 Phần mềm</Link>
                <Link href="/?cat=Nhạc" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">🎵 Nhạc</Link>
              </div>
            )}
          </div>

          {/* Donate */}
          <Link href="/donate" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>
            Donate
          </Link>
          {/* Góp ý */}
          <Link href="/feedback" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>
            Góp ý
          </Link>
          {/* GIỚI THIỆU */}
          <Link href="/about" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>
            Giới thiệu
          </Link>

          {/* NÚT SÁNG TỐI */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-slate-700 dark:text-yellow-400 hover:bg-white/10 transition-all"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}