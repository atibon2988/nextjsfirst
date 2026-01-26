// app/components/Header.tsx
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
    const searchRef = useRef<HTMLDivElement>(null);

    // --- MỚI THÊM: Lắng nghe URL để xóa trắng ô tìm kiếm ---
    useEffect(() => {
        // Lấy từ khóa từ URL (nếu có)
        const currentSearchInUrl = searchParams.get('search');
        
        // Nếu trên URL có từ khóa -> Điền vào ô input
        // Nếu trên URL không có (về trang chủ) -> Xóa trắng ô input
        setSearchTerm(currentSearchInUrl || "");
        
    }, [searchParams]); // Chạy lại mỗi khi URL thay đổi
    // -------------------------------------------------------

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

    const saveToHistory = (term: string) => {
        if (!term.trim()) return;
        const newHistory = [term, ...history.filter(h => h !== term)].slice(0, 5);
        setHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    };

    const handleSearch = (term: string) => {
        if (term.trim()) {
            saveToHistory(term);
            router.push(`/?search=${encodeURIComponent(term)}`);
            setShowHistory(false);
        } else {
            router.push('/');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
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
        <div className="flex gap-3 items-center w-full md:w-auto">
            {/* Nút Danh Mục */}
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition h-10 text-sm whitespace-nowrap backdrop-blur-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    <span className="hidden sm:inline">Danh mục</span>
                </button>

                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 text-gray-800">
                            <button 
                                onClick={() => { setIsDropdownOpen(false); router.push('/'); }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 font-bold border-b border-gray-100"
                            >
                                Tất cả
                            </button>
                            {categories.map((cat) => (
                                <button key={cat} onClick={() => handleCategoryClick(cat)} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Ô Tìm Kiếm */}
            <div className="flex-1 relative min-w-[200px]" ref={searchRef}>
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
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-30 overflow-hidden animate-in fade-in slide-in-from-top-1">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span>LỊCH SỬ</span>
                            <button onClick={() => {setHistory([]); localStorage.removeItem('searchHistory')}} className="hover:text-red-500">Xóa hết</button>
                        </div>
                        {history.map((item, index) => (
                            <div key={index} onClick={() => { setSearchTerm(item); handleSearch(item); }} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer flex justify-between items-center group">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    {item}
                                </div>
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
                    <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2 hover:opacity-90 transition">
                       <span className="text-2xl">🚀</span> KhoTaiNguyen
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