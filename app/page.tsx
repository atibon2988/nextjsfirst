"use client";

import Link from 'next/link';
import { useState } from 'react';

// Dữ liệu giả lập (Giữ nguyên như cũ)
const allItems = [
  { id: 1, title: "VS Code for Android", description: "Trình soạn thảo code, bản chạy trên trình duyệt.", version: "v4.9.0", date: "2024-01-20", category: "Phần mềm", downloadUrl: "#" },
  { id: 2, title: "Genshin Impact (Lite)", description: "Phiên bản giảm dung lượng cho máy cấu hình yếu.", version: "v4.0", date: "2024-01-22", category: "Game", downloadUrl: "#" },
  { id: 3, title: "Tuyển tập Nhạc Lo-fi", description: "100 bài nhạc không lời giúp tập trung code cực chill.", version: "Album 1", date: "2024-01-15", category: "Nhạc", downloadUrl: "#" },
  { id: 4, title: "Bộ Ảnh 4K Cyberpunk", description: "Hình nền chất lượng cao chủ đề tương lai.", version: "Pack 1", date: "2024-01-10", category: "Ảnh", downloadUrl: "#" },
  { id: 5, title: "Termux Premium", description: "Giả lập Terminal mạnh mẽ trên Android.", version: "v0.118", date: "2024-01-18", category: "Phần mềm", downloadUrl: "#" },
  { id: 6, title: "Hướng dẫn React (Video)", description: "Series video dạy lập trình React từ cơ bản đến nâng cao.", version: "Full HD", date: "2024-01-05", category: "Video", downloadUrl: "#" },
];

const categories = ["Tất cả", "Phần mềm", "Ảnh", "Nhạc", "Video", "Game"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredItems = allItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" ? true : item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // --- THAY ĐỔI LỚN Ở ĐÂY: Thêm ảnh nền vào thẻ main ---
    <main 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        // Link ảnh mẫu chất lượng cao (Bạn có thể thay link khác vào đây)
        backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      {/* LỚP PHỦ MÀU ĐEN MỜ: Giúp chữ dễ đọc hơn trên nền ảnh */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* NỘI DUNG CHÍNH: Phải đặt trong một thẻ div có z-index cao hơn lớp phủ */}
      <div className="relative z-10">

        {/* Header: Làm bán trong suốt (backdrop-blur) cho đẹp */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 border-b border-white/20">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-blue-700">Kho Tài Nguyên</h1>
              <nav className="text-sm font-medium text-gray-700">
                <Link href="/about" className="hover:text-blue-600 transition">Giới thiệu</Link>
              </nav>
            </div>

            <div className="flex gap-2 relative">
              <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Tìm phần mềm, game, nhạc..." 
                    className="w-full pl-10 pr-4 py-2 bg-white/90 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  <span>{selectedCategory}</span>
                  <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsDropdownOpen(false);
                          }}
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
          </div>
        </header>

        {/* Danh sách kết quả */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          <div className="flex justify-between items-center mb-6">
              {/* Đổi màu chữ tiêu đề thành trắng để nổi trên nền tối */}
              <h2 className="text-xl font-bold text-white/90">
                {selectedCategory === "Tất cả" ? "Mới cập nhật" : `Danh mục: ${selectedCategory}`}
              </h2>
              <span className="text-sm text-gray-300">Tìm thấy {filteredItems.length} kết quả</span>
          </div>
          
          {filteredItems.length > 0 ? (
            // Thêm backdrop-blur nhẹ cho các thẻ bài viết để tạo chiều sâu
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group">
                  
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded 
                        ${item.category === 'Game' ? 'bg-purple-100 text-purple-800' : 
                          item.category === 'Video' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {item.category}
                      </span>
                      <span className="text-gray-500 text-xs">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100 flex gap-2">
                    <Link href={`/software/${item.id}`} className="flex-1 text-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                      Chi tiết
                    </Link>
                    <a href={item.downloadUrl} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                      Tải về
                    </a>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white">Không tìm thấy kết quả nào</h3>
              <p className="text-gray-300">Thử tìm từ khóa khác hoặc chọn danh mục "Tất cả"</p>
            </div>
          )}

        </div>

        {/* Footer bán trong suốt */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-12 py-8 text-center text-gray-600 text-sm">
          © 2024 Kho Tài Nguyên. Built with Next.js.
        </footer>

      </div>
    </main>
  );
}