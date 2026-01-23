import Link from 'next/link';

// 1. Đây là Dữ liệu giả lập (Sau này sẽ lấy từ Database)
// Bạn có thể thêm sửa xóa phần mềm trực tiếp tại đây
const softwares = [
  {
    id: 1,
    title: "VS Code for Android",
    description: "Trình soạn thảo code tốt nhất, phiên bản chạy trên trình duyệt cho Android.",
    version: "v4.9.0",
    date: "2024-01-20",
    category: "Dev Tools",
    downloadUrl: "#" // Link tải tạm thời
  },
  {
    id: 2,
    title: "Termux Premium",
    description: "Giả lập Terminal mạnh mẽ trên Android, đã cài sẵn các gói cần thiết.",
    version: "v0.118",
    date: "2024-01-18",
    category: "System",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Bộ hình nền 4K",
    description: "Tổng hợp 100+ hình nền chủ đề Cyberpunk siêu nét.",
    version: "Pack 1",
    date: "2024-01-15",
    category: "Media",
    downloadUrl: "#"
  },
  // Bạn có thể copy thêm các mục ở đây...
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Kho Phần Mềm</h1>
          <nav className="space-x-4 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <Link href="/about" className="hover:text-blue-600">Giới thiệu</Link>
          </nav>
        </div>
      </header>

      {/* --- DANH SÁCH BÀI VIẾT / PHẦN MỀM --- */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mới cập nhật</h2>
        
        {/* Lưới hiển thị (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Hàm map() giúp lặp qua danh sách softwares để tạo thẻ HTML */}
          {softwares.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
              
              {/* Phần nội dung thẻ */}
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-gray-400 text-xs">{item.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                  Phiên bản: {item.version}
                </div>
              </div>

              {/* Phần nút bấm ở dưới cùng */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex gap-2">
                <Link href={`/software/${item.id}`} className="flex-1 text-center bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                  Xem chi tiết
                </Link>
                <a href={item.downloadUrl} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-blue-200 shadow-md">
                  Tải ngay
                </a>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
        © 2024 Kho Phần Mềm. Built with Next.js on Android.
      </footer>
    </main>
  );
}