"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';

const categories = ["Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

function SearchAndMenu() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState(""); 
    const [history, setHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // --- MỚI: State cho Dark Mode ---
    const [isDarkMode, setIsDarkMode] = useState(false);
    // -------------------------------

    const searchRef = useRef<HTMLDivElement>(null);

    // 1. Logic Dark Mode
    useEffect(() => {
        // Kiểm tra xem máy người dùng đã lưu chế độ nào chưa
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // 2. Logic Tìm kiếm & Lịch sử (Giữ nguyên như cũ)
    useEffect(() => {
        const currentSearchInUrl = searchParams.get('search');
        setSearchTerm(currentSearchInUrl || "");
    }, [searchParams]);

    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) setHistory(JSON.parse(savedHistory));

        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowHistory(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (term: string) => {
        if (term.trim()) {
            const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
            setHistory(newHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            
            router.push(`/?search=${encodeURIComponent(term)}`);
            setShowHistory(false);
        } else {
            router.push('/');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch(searchTerm);
    };

    const handleCategoryClick = (cat: string) => {
        setIsDropdownOpen(false);
        router.push(`/?category=${encodeURIComponent(cat)}`);
    };

    const deleteHistoryItem = (e: React.MouseEvent, itemToDelete: string) => {
        e.stopPropagation();
        const newHistory = history.filter(h => h !== itemToDelete);
        setHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    return (
        <div className="flex gap-2 items-center w-full md:w-auto">
            
            {/* --- NÚT DARK MODE (MỚI) --- */}
            <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-yellow-300 transition backdrop-blur-sm h-10 w-10 flex items-center justify-center border border-white/10"
                title="Đổi giao diện Sáng/Tối"
            >
                {isDarkMode ? (
                    // Icon Mặt trăng (Đang tối)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                ) : (
                    // Icon Mặt trời (Đang sáng)
                    <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                )}
            </button>

            {/* Nút Danh Mục (Giữ nguyên) */}
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg font-medium hover:bg-white/20 transition h-10 text-sm whitespace-nowrap backdrop-blur-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    <span className="hidden sm:inline">Danh mục</span>
                </button>
                {/* ... (Dropdown giữ nguyên) ... */}
                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 dark:border-slate-700 rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden text-gray-800 dark:text-gray-200">
                             <button onClick={() => { setIsDropdownOpen(false); router.push('/'); }} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 font-bold border-b border-gray-100 dark:border-slate-700">Tất cả</button>
                            {categories.map((cat) => (
                                <button key={cat} onClick={() => handleCategoryClick(cat)} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition">{cat}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Ô Tìm Kiếm (Giữ nguyên logic) */}
            <div className="flex-1 relative min-w-[160px]" ref={searchRef}>
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-400 rounded-lg transition-all text-sm h-10 shadow-inner" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowHistory(true)}
                />
                <svg className="w-4 h-4 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

                {showHistory && history.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-30 overflow-hidden">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span>LỊCH SỬ</span>
                            <button onClick={() => {setHistory([]); localStorage.removeItem('searchHistory')}} className="hover:text-red-500">Xóa</button>
                        </div>
                        {history.map((item, index) => (
                            <div key={index} onClick={() => { setSearchTerm(item); handleSearch(item); }} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                                {item}
                                <button onClick={(e) => deleteHistoryItem(e, item)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">&times;</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-md sticky top-0 z-50 border-b border-blue-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center w-full md:w-auto justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                      {/* Chèn logo ảnh vào đây */}
                      <img 
                        src="/logo.png" 
                        alt="LMC Logo" 
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
                      />
  
                      {/* Tên thương hiệu bên cạnh logo (nếu muốn giữ lại) */}
                      <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                AnyThink
                      </span>
                    </Link>
                    <nav className="flex gap-4 text-sm font-medium text-blue-100 md:hidden">
                        <Link href="/about" className="hover:text-white transition">Giới thiệu</Link>
                    </nav>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-blue-100 mr-auto ml-8">
                    <Link href="/" className="hover:text-white transition opacity-80 hover:opacity-100">Trang chủ</Link>
                    <Link href="/about" className="hover:text-white transition opacity-80 hover:opacity-100">Giới thiệu</Link>
                </nav>
                <Suspense fallback={<div className="w-full md:w-64 h-10 bg-white/20 rounded animate-pulse"></div>}>
                    <SearchAndMenu />
                </Suspense>
            </div>
        </header>
    );
}