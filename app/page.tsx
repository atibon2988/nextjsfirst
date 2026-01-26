"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { allItems } from './data';

function ItemCard({ item }: { item: any }) {
    // ... (Giữ nguyên code ItemCard cũ của bạn, không cần sửa)
    // Để cho gọn tôi không paste lại đoạn ItemCard dài ngoằng nhé.
    // Bạn cứ giữ nguyên function ItemCard như cũ.
    
    // --- Copy đoạn code ItemCard từ tin nhắn trước dán vào đây ---
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
        <Link href={`/software/${item.id}`} className="block h-full">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer">
                <div className="h-52 w-full overflow-hidden relative">
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
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-1">
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

function SearchResults() {
    const searchParams = useSearchParams();
    
    // 1. Lấy từ khóa và danh mục từ URL
    const searchTerm = searchParams.get('search')?.toLowerCase() || "";
    const category = searchParams.get('category') || "Tất cả";

    // 2. Logic lọc dữ liệu
    const filteredItems = allItems.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                              item.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "Tất cả" ? true : item.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Tiêu đề kết quả */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {category === "Tất cả" && !searchTerm ? "🔥 Mới cập nhật" : "🔍 Kết quả tìm kiếm"}
                </h2>
                <span className="text-sm text-gray-500">
                    {category !== "Tất cả" && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">{category}</span>}
                    {searchTerm && <span className="text-gray-800 mr-2">Từ khóa: "{searchTerm}"</span>}
                    ({filteredItems.length})
                </span>
            </div>

            {/* Lưới hiển thị */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-xl font-bold text-gray-700">Không tìm thấy kết quả</h3>
                    <p className="text-gray-500 mt-2">Hãy thử đổi danh mục hoặc từ khóa khác xem sao.</p>
                </div>
            )}
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Cần bọc trong Suspense để đọc URL không bị lỗi */}
            <Suspense fallback={<div className="p-10 text-center">Đang tải dữ liệu...</div>}>
                <SearchResults />
            </Suspense>
        </main>
    );
}