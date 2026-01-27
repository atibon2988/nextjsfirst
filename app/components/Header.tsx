"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes'; // Nếu bạn dùng next-themes

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  // Theo dõi sự kiện cuộn chuột
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-2 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO THAY ĐỔI THEO TRẠNG THÁI */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10">
            {/* Logo cho nền tối (hiện khi ở trên cùng hoặc darkmode) */}
            <img 
              src="/logo-white.png" 
              alt="Logo"
              className={`absolute inset-0 transition-opacity duration-500 ${
                isScrolled && theme !== 'dark' ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Logo cho nền sáng (hiện khi cuộn xuống ở lightmode) */}
            <img 
              src="/logo-black.png" 
              alt="Logo"
              className={`absolute inset-0 transition-opacity duration-500 ${
                isScrolled && theme !== 'dark' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span className={`text-2xl font-bold transition-colors duration-500 ${
            isScrolled && theme !== 'dark' ? 'text-slate-900' : 'text-white'
          }`}>
            AnyThink
          </span>
        </Link>

        {/* MENU */}
        <nav className={`hidden md:flex gap-8 font-medium transition-colors duration-500 ${
          isScrolled && theme !== 'dark' ? 'text-slate-600' : 'text-white/90'
        }`}>
          <Link href="/" className="hover:text-blue-500 transition">Trang chủ</Link>
          <Link href="/about" className="hover:text-blue-500 transition">Giới thiệu</Link>
          <Link href="/contact" className="hover:text-blue-500 transition">Liên hệ</Link>
        </nav>

        {/* NÚT BẬT/TẮT DARK MODE (Giữ nguyên logic cũ của bạn) */}
        <button className="...">
           {/* Icon mặt trời/mặt trăng */}
        </button>
      </div>
    </header>
  );
}