// app/components/Navbar.tsx
"use client"; // Bắt buộc dòng này để dùng được tính năng bấm/đóng

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();

  // Tự động đóng menu khi URL thay đổi (Phòng hờ)
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [searchParams]);

  // Hàm đóng tất cả menu
  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const categories = [
    { name: 'Tin tức', slug: 'Tin tức' },
    { name: 'Game', slug: 'Game' },
    { name: 'Phần mềm', slug: 'Phần mềm' },
    { name: 'Video', slug: 'Video' },
    { name: 'Ảnh', slug: 'Ảnh' },
    { name: 'Nhạc', slug: 'Nhạc' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 transition-all duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" onClick={closeAll} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
            A
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            AnyThink
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" onClick={closeAll} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            Trang chủ
          </Link>
          
          {/* Dropdown Danh mục */}
          <div className="relative group">
            <button 
              className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition py-4"
            >
              Danh mục
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {/* Menu con */}
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              {categories.map((cat) => (
                <Link 
                  key={cat.slug} 
                  href={`/?cat=${cat.slug}`} 
                  onClick={closeAll} // QUAN TRỌNG: Bấm vào là đóng
                  className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 border-b border-slate-100 dark:border-slate-800 last:border-0"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" onClick={closeAll} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            Giới thiệu
          </Link>
        </div>

        {/* Nút Tìm kiếm & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-transparent focus-within:border-blue-500 transition-all w-64">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <form action="/" className="w-full">
               <input 
                name="search"
                type="text" 
                placeholder="Tìm kiếm..." 
                className="bg-transparent border-none outline-none text-sm w-full ml-2 text-slate-700 dark:text-white placeholder:text-slate-400"
              />
            </form>
          </div>

          {/* Nút Menu Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU CONTENT */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 animate-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col space-y-2">
             {/* Tìm kiếm Mobile */}
            <form action="/" className="mb-4">
               <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-xl">
                 <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                 <input name="search" type="text" placeholder="Tìm kiếm tài nguyên..." className="bg-transparent border-none outline-none text-sm w-full ml-3 text-slate-900 dark:text-white" />
               </div>
            </form>

            <Link href="/" onClick={closeAll} className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-medium text-slate-900 dark:text-white">
              Trang chủ
            </Link>
            
            {/* Danh mục Mobile */}
            <div className="space-y-1 pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
               <p className="text-xs font-bold text-slate-400 uppercase mb-2 px-4 pt-2">Danh mục</p>
               {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/?cat=${cat.slug}`} 
                    onClick={closeAll} 
                    className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 active:text-blue-500"
                  >
                    {cat.name}
                  </Link>
               ))}
            </div>

            <Link href="/about" onClick={closeAll} className="px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-600 dark:text-slate-400">
              Giới thiệu
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}