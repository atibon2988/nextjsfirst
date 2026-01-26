// app/components/Header.tsx
"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const categories = ["Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

function SearchAndMenu() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Xử lý tìm kiếm
    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim()) {
                router.push(`/?search=${encodeURIComponent(searchTerm)}`);
            } else {
                router.push('/');
            }
        }
    };

    // Xử lý chọn danh mục
    const handleCategoryClick = (cat: string) => {
        setIsDropdownOpen(false);
        router.push(`/?category=${encodeURIComponent(cat)}`);
    };

    return (
        <div className="flex gap-3 items-center">
            
            {/* 1. NÚT DANH MỤC (Sổ xuống riêng biệt) */}
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:border-blue-500 hover:text-blue-600 transition h-10 text-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    <span>Danh mục</span>
                </button>

                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <button 
                                onClick={() => { setIsDropdownOpen(false); router.push('/'); }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 font-bold border-b border-gray-100"
                            >
                                Tất cả
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryClick(cat)}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700 transition"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* 2. Ô TÌM KIẾM (Riêng biệt) */}
            <div className="flex-1 relative min-w-[200px]">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all text-sm h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
        </div>
    );
}

export default function Header() {
    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo & Brand */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
                       🚀 KhoTaiNguyen
                    </Link>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                        <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
                        <Link href="/about" className="hover:text-blue-600 transition">Giới thiệu</Link>
                    </nav>
                </div>

                {/* Search & Menu */}
                <Suspense fallback={<div className="w-40 h-10 bg-gray-100 rounded"></div>}>
                    <SearchAndMenu />
                </Suspense>
            </div>
        </header>
    );
}