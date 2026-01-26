"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { allItems } from './data';

// Danh sách các danh mục để hiển thị ở trang chủ
const categories = ["Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

// --- 1. Component Thẻ Bài Viết (Giữ nguyên logic của bạn) ---
function ItemCard({ item }: { item: any }) {
    const getBadgeColor = (cat: string) => {
        switch(cat) {
            case 'Game': return 'bg-purple-100 text-purple-700';
            case 'Tin tức': return 'bg-red-100 text-red-700';
            case 'Video': return 'bg-pink-100 text-pink-700';
            case 'Phần mềm': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Link href={`/software/${item.id}`} className="block h-full">
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer">
                <div className="h-48 w-full overflow-hidden relative">
                    {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/50 to-transparent">
                        <span className={`text-xs font-bold px-2 py-1 rounded shadow-sm ${getBadgeColor(item.category)}`}>
                            {item.category}
                        </span>
                    </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-1">📅 {item.date}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                </div>
            </div>
        </Link>
    );
}

// --- 2. Giao diện Mặc định (Hiển thị từng mục + 2 bài) ---
function DefaultHomeView() {
    return (
        <div className="space-y-12">
            {/* Banner chào mừng */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
                    <p className="opacity-90">Khám phá kho tàng phần mềm, game và tài liệu miễn phí mới nhất.</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-10"></div>
            </div>

            {/* Lặp qua từng danh mục */}
            {categories.map((cat) => {
                // Lấy 2 bài mới nhất của danh mục đó
                const items = allItems.filter(item => item.category === cat).slice(0, 2);
                
                // Nếu danh mục đó không có bài nào thì bỏ qua
                if (items.length === 0) return null;

                return (
                    <section key={cat}>
                        <div className="flex justify-between items-center mb-6 border-l-4 border-blue-600 pl-4">
                            <h2 className="text-2xl font-bold text-gray-800">{cat}</h2>
                            <Link 
                                href={`/?category=${encodeURIComponent(cat)}`}
                                className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-full font-medium transition"
                            >
                                Xem tất cả &rarr;
                            </Link>
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
    );
}

// --- 3. Giao diện Lọc/Tìm kiếm (Hiển thị lưới) ---
function FilteredView({ search, category }: { search: string, category: string }) {
    const filteredItems = allItems.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                              item.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? item.category === category : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
                <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
                <span>/</span>
                <span className="font-bold text-gray-800">
                    {category || "Tìm kiếm"}
                </span>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {category ? `Danh mục: ${category}` : `Tìm kiếm: "${search}"`}
                </h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                    {filteredItems.length} kết quả
                </span>
            </div>

            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-700">Không tìm thấy gì cả</h3>
                    <p className="text-gray-500 mt-2">Thử tìm từ khóa khác xem sao.</p>
                    <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                        Quay về trang chủ
                    </Link>
                </div>
            )}
        </div>
    );
}

// --- 4. Component Chính (Điều phối hiển thị) ---
function MainContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    // Logic quan trọng: 
    // Nếu CÓ search hoặc CÓ category trên URL -> Hiện giao diện Lọc (FilteredView)
    // Nếu KHÔNG có gì -> Hiện giao diện Mặc định (DefaultHomeView)
    if (search || category) {
        return <FilteredView search={search || ""} category={category || ""} />;
    }

    return <DefaultHomeView />;
}

export default function Home() {
    return (
        <main className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Suspense fallback={<div>Đang tải...</div>}>
                    <MainContent />
                </Suspense>
            </div>
            
            <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
                © 2026 Kho Tài Nguyên. All rights reserved.
            </footer>
        </main>
    );
}