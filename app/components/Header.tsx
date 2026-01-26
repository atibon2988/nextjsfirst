// app/components/Header.tsx
"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

const categories = ["Tất cả", "Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Lấy giá trị hiện tại từ URL để điền vào ô tìm kiếm
    const initialSearch = searchParams.get('search') || "";
    const initialCategory = searchParams.get('category') || "Tất cả";

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Hàm cập nhật URL
    const updateURL = (term: string, cat: string) => {
        const params = new URLSearchParams();
        if (term) params.set('search', term);
        if (cat && cat !== "Tất cả") params.set('category', cat);
        
        // Chuyển hướng về trang chủ với tham số lọc
        router.push(`/?${params.toString()}`);
    };

    // Khi bấm chọn danh mục
    const handleCategorySelect = (cat: string) => {
        setSelectedCategory(cat);
        setIsDropdownOpen(false);
        updateURL(searchTerm, cat);
    };

    // Khi nhấn Enter ở ô tìm kiếm
    const handleSearchSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateURL(searchTerm, selectedCategory);
        }
    };

    return (
        <div className="flex gap-2 relative">
            {/* Ô Tìm kiếm */}
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm & nhấn Enter..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all text-sm h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            {/* Nút Danh mục */}
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition h-10 text-sm whitespace-nowrap"
                >
                    <span>{selectedCategory}</span>
                    <svg className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition ${selectedCategory === cat ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-700'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function Header() {
    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-3">
                {/* Hàng trên: Logo & Giới thiệu */}
                <div className="flex justify-between items-center mb-3">
                    <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
                        KhoTaiNguyen
                    </Link>
                    <nav className="text-sm font-medium text-gray-600 flex gap-4">
                        <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
                        <Link href="/about" className="hover:text-blue-600 transition">Giới thiệu</Link>
                    </nav>
                </div>

                {/* Hàng dưới: Thanh tìm kiếm & Danh mục */}
                <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse"></div>}>
                    <SearchBar />
                </Suspense>
            </div>
        </header>
    );
}