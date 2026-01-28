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

  // 1. STATE & LOGIC THỜI TIẾT
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState({ temp: "25", city: "Hà Nội", condition: "Clouds" });

  useEffect(() => {
    // Load lịch sử từ máy người dùng
    const saved = localStorage.getItem('search_history');
    if (saved) setSearchHistory(JSON.parse(saved));
  }, []);

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

  // 2. LOGIC FETCH API & ĐỒNG HỒ
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);

    // Hàm lấy thời tiết
    const fetchWeather = async () => {
      try {
        // --- QUAN TRỌNG: Hãy điền API Key của bạn vào đây ---
        const API_KEY = "YOUR_OPENWEATHER_API_KEY"; 
        
        // Nếu chưa có key, code sẽ dùng giá trị mặc định (25 độ, Mây)
        if (API_KEY === "YOUR_OPENWEATHER_API_KEY") return;

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&appid=${API_KEY}`);
        
        if (res.ok) {
          const data = await res.json();
          setWeather({
            temp: Math.round(data.main.temp).toString(),
            city: "Hà Nội", 
            condition: data.weather[0].main 
          });
        }
      } catch (error) {
        console.error("Lỗi API thời tiết, dùng dữ liệu mặc định");
      }
    };

    fetchWeather();
    return () => clearInterval(timer);
  }, []);

  // 3. HÀM CHỌN ICON
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear': // Nắng
        return (
          <svg className="w-4 h-4 text-yellow-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        );
      case 'Rain': // Mưa
      case 'Drizzle':
      case 'Thunderstorm':
        return (
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      case 'Clouds': // Mây
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('search_history', JSON.stringify(newHistory));
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const saveToHistory = (query: string) => { /* Hàm này bạn đã có logic trong handleSearch nên có thể bỏ qua nếu muốn gọn */ };

  const navLinkStyle = "relative py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors";
  
  if (!mounted) return <div className="h-20" />;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/10 dark:bg-slate-900/10 backdrop-blur-md py-2 shadow-sm border-b border-white/5' 
        : 'bg-white/5 dark:bg-slate-900/5 backdrop-blur-sm py-4'
    }`}>
      {/* --- PHẦN BẠN BỊ THIẾU: Thẻ DIV bao bọc nội dung (Container) --- */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
        
        {/* 1. KHỐI LOGO & THỜI TIẾT */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className={`h-20 w-auto transition-all duration-500 ${theme === 'dark' ? 'invert brightness-0' : 'brightness-0'}`} 
            />
            <span className="text-xl font-bold text-slate-900 dark:text-white">AnyThink</span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-300/30 dark:border-slate-700/30 h-8">
            <div className="flex flex-col justify-center text-[10px] font-bold uppercase tracking-tighter leading-tight">
    
              {/* HÀNG TRÊN */}
              <div className="flex items-center gap-2">
                <span className="text-slate-900 dark:text-slate-200">
                  {weather.city}
                </span>
                <div className="flex items-center">
                  {getWeatherIcon(weather.condition)}
                </div>
              </div>

              {/* HÀNG DƯỚI */}
              <div className="flex items-center gap-2 font-medium opacity-70 text-slate-500">
                <span>{currentTime}</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {weather.temp}°
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* 2. KHỐI CĂN PHẢI */}
        <div className="flex items-center gap-6 flex-1 justify-end">
          
          {/* TÌM KIẾM */}
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
            
            {/* TOOLTIP LỊCH SỬ */}
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

          {/* MENU LINKS */}
          <Link href="/" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>
            Trang chủ
          </Link>

          {/* DANH MỤC */}
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition">
              <span>Danh mục</span>
              <svg className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
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

          <Link href="/donate" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>Donate</Link>
          <Link href="/feedback" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>Góp ý</Link>
          <Link href="/about" className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${navLinkStyle} hidden sm:block`}>Giới thiệu</Link>

          {/* DARK MODE */}
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full text-slate-700 dark:text-yellow-400 hover:bg-white/10 transition-all">
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </div>

      {/* --- ĐÂY LÀ THẺ ĐÓNG CỦA CONTAINER MÀ BẠN CÓ SẴN --- */}
      </div> 
    </header>
  );
}