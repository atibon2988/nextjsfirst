"use client";

import Link from 'next/link';
import { useState } from 'react';
import { allItems } from './data'; // Import dữ liệu từ file riêng

const categories = ["Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

export default function Home() {
  const [filterCategory, setFilterCategory] = useState("Trang chủ");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-blue-600 cursor-pointer" 
            onClick={() => setFilterCategory("Trang chủ")}
          >
            KhoTaiNguyen
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <button 
                onClick={() => setFilterCategory("Trang chủ")}
                className={`text-sm font-medium hover:text-blue-600 ${filterCategory === 'Trang chủ' ? 'text-blue-600' : 'text-gray-600'}`}
            >
                Trang chủ
            </button>

            {/* Dropdown Danh Mục */}
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
                >
                    Danh mục
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {/* Menu sổ xuống */}
                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setFilterCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600">Giới thiệu</Link>
          </nav>
        </div>
      </header>

      {/* --- NỘI DUNG CHÍNH --- */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* TRƯỜNG HỢP 1: Ở Trang Chủ -> Hiển thị TẤT CẢ danh mục, mỗi cái 2 bài */}
        {filterCategory === "Trang chủ" ? (
            <div className="space-y-12">
                {/* Banner chào mừng */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8">
                    <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại!</h1>
                    <p className="opacity-90">Khám phá kho tàng phần mềm, game và tài liệu miễn phí.</p>
                </div>

                {categories.map((cat) => {
                    // Lọc lấy đúng danh mục và chỉ cắt lấy 2 bài đầu tiên
                    const items = allItems.filter(item => item.category === cat).slice(0, 2);
                    
                    return (
                        <section key={cat}>
                            <div className="flex justify-between items-center mb-4 border-l-4 border-blue-600 pl-3">
                                <h2 className="text-2xl font-bold text-gray-800">{cat}</h2>
                                <button 
                                    onClick={() => setFilterCategory(cat)}
                                    className="text-sm text-blue-600 hover:underline font-medium"
                                >
                                    Xem thêm &rarr;
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {items.map(item => (
                                    <ItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
        ) : (
            // TRƯỜNG HỢP 2: Đang lọc theo 1 danh mục cụ thể -> Hiển thị HẾT danh mục đó
            <div>
                <div className="mb-6">
                    <button onClick={() => setFilterCategory("Trang chủ")} className="text-sm text-gray-500 hover:text-blue-600 mb-2">&larr; Quay lại trang chủ</button>
                    <h2 className="text-3xl font-bold text-gray-900">{filterCategory}</h2>
                    <p className="text-gray-500 mt-1">Tìm thấy {allItems.filter(i => i.category === filterCategory).length} kết quả.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allItems
                        .filter(item => item.category === filterCategory)
                        .map(item => (
                            <ItemCard key={item.id} item={item} />
                        ))
                    }
                </div>
            </div>
        )}

      </div>

      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
        © 2026 Kho Tài Nguyên. All rights reserved.
      </footer>
    </main>
  );
}

// --- Component Card nhỏ gọn để tái sử dụng ---
// Trong file app/page.tsx

function ItemCard({ item }: { item: any }) {
    const getBadgeColor = (cat: string) => {
        switch(cat) {
            case 'Game': return 'bg-purple-100 text-purple-700';
            case 'Tin tức': return 'bg-red-100 text-red-700';
            case 'Video': return 'bg-pink-100 text-pink-700';
            case 'Phần mềm': return 'bg-blue-100 text-blue-700';
            case 'Ảnh': return 'bg-green-100 text-green-700';
            case 'Nhạc': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        // BỌC CẢ THẺ BẰNG LINK => Bấm đâu cũng chuyển trang
        <Link href={`/software/${item.id}`} className="block h-full">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer">
                
                {/* Phần Ảnh */}
                <div className="h-52 w-full overflow-hidden relative">
                    {item.imageUrl ? (
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    
                    {/* Badge danh mục */}
                    <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/50 to-transparent">
                        <span className={`text-xs font-bold px-2 py-1 rounded shadow-sm ${getBadgeColor(item.category)}`}>
                            {item.category}
                        </span>
                    </div>
                </div>

                {/* Phần Nội Dung (Đã bỏ hết nút bấm) */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {item.date}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}