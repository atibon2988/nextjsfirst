"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { allItems } from './data';
import { supabase } from "./lib/supabase";

//const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
// Sau đó dùng posts thay cho allItems
const categories = ["Tin tức", "Game", "Video", "Ảnh", "Phần mềm", "Nhạc"];

// --- ITEM CARD (Đã sửa lỗi ảnh và thêm Dark Mode) ---
function ItemCard({ item }: { item: any }) {
    const getBadgeColor = (cat: string) => {
        switch(cat) {
            case 'Game': return 'bg-purple-100 text-purple-700';
            case 'Tin tức': return 'bg-red-100 text-red-700';
            case 'Video': return 'bg-pink-100 text-pink-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    // [THÊM] Hàm định dạng ngày tháng để hiển thị đẹp hơn
    const formatDate = (dateString: string) => {
        if (!dateString) return "Mới cập nhật";
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <Link href={`/software/${item.id}`} className="block h-full group">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                
                {/* PHẦN ẢNH: Đã khớp với cột image_url từ DB */}
                <div className="h-48 w-full relative overflow-hidden bg-gray-200 dark:bg-slate-700 border-b dark:border-slate-700">
                    <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy" // Tối ưu tốc độ load
                    />
                    <div className="absolute top-2 left-2">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm ${getBadgeColor(item.category)}`}>
                            {item.category}
                        </span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    {/* [SỬA] Hiển thị created_at đã qua hàm format */}
                    <div className="text-gray-400 dark:text-slate-500 text-[11px] mb-2 flex items-center gap-1">
                        <span>📅</span> {formatDate(item.created_at)}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

// --- LOGIC TRANG CHỦ GIỮ NGUYÊN ---
function DefaultHomeView() {
    const [dbPosts, setDbPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });
            if (data) setDbPosts(data);
        };
        fetchPosts();
    }, []);
    return (
        <div className="space-y-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8">
                <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
                <p className="opacity-90">Khám phá kho tàng phần mềm, game và tài liệu miễn phí.</p>
            </div>
            {categories.map((cat) => {
                const items = dbPosts.filter(item => item.category === cat).slice(0, 4);
                //const items = allItems.filter(item => item.category === cat).slice(0, 2);
                if (items.length === 0) return null;
                return (
                    <section key={cat}>
                        <div className="flex justify-between items-center mb-6 border-l-4 border-blue-600 pl-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{cat}</h2>
                            <Link href={`/?category=${encodeURIComponent(cat)}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Xem tất cả &rarr;</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {items.map(item => <ItemCard key={item.id} item={item} />)}
                        </div>
                    </section>
                )
            })}
        </div>
    );
}

function FilteredView({ search, category }: { search: string, category: string }) {
    const [dbPosts, setDbPosts] = useState<any[]>([]);
    useEffect(() => {
        const fetchFiltered = async () => {
            let query = supabase.from('posts').select('*');
            
            // Nếu có category, lọc ngay từ DB cho nhanh
            if (category) query = query.eq('category', category);
            
            const { data } = await query.order('created_at', { ascending: false });
            if (data) setDbPosts(data);
        };
        fetchFiltered();
    }, [category]);

    // Lọc theo search (client-side hoặc bạn có thể dùng .ilike() của Supabase)
    const results = dbPosts.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });
//    const filteredItems = allItems.filter((item) => {
//        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
//        const matchesCategory = category ? item.category === category : true;
//        return matchesSearch && matchesCategory;
//    });
    if (filteredItems.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-xl">Rất tiếc, không tìm thấy tài nguyên nào phù hợp với "{search}"</p>
                <Link href="/" className="text-blue-600 mt-4 inline-block">Quay lại trang chủ</Link>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {category ? `Danh mục: ${category}` : `Tìm kiếm: "${search}"`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => <ItemCard key={item.id} item={item} />)}
            </div>
        </div>
    );
}

function MainContent() {
    const searchParams = useSearchParams();
    
    // Header gửi ?search=... nên ta giữ nguyên
    const search = searchParams.get('search');
    
    // Header gửi ?cat=... (ở bản Header trước) hoặc ?category=... 
    // Chúng ta sẽ kiểm tra cả hai để chắc chắn không sót
    const category = searchParams.get('category') || searchParams.get('cat');
    
    if (search || category) {
        return <FilteredView search={search || ""} category={category || ""} />;
    }
    
    return <DefaultHomeView />;
}

export default function Home() {
    return (
        <main className="min-h-screen pb-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <Suspense fallback={<div className="text-white">Đang tải...</div>}>
                    <MainContent />
                </Suspense>
            </div>
        </main>
    );
}