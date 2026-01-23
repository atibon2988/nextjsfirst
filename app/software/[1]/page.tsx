import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. Dữ liệu giả (Tạm thời để ở đây, sau này thay bằng Database)
const softwares = [
  {
    id: 1,
    title: "VS Code for Android",
    description: "Trình soạn thảo code tốt nhất, phiên bản chạy trên trình duyệt cho Android.",
    detailContent: "Đây là nội dung chi tiết dài hơn... \n\nHướng dẫn cài đặt:\nB1. Tải về.\nB2. Cài đặt code-server...",
    version: "v4.9.0",
    date: "2024-01-20",
    category: "Dev Tools",
    downloadUrl: "#",
    size: "85 MB"
  },
  {
    id: 2,
    title: "Termux Premium",
    description: "Giả lập Terminal mạnh mẽ trên Android, đã cài sẵn các gói cần thiết.",
    detailContent: "Termux là công cụ không thể thiếu. Bản này đã fix lỗi kho lưu trữ...",
    version: "v0.118",
    date: "2024-01-18",
    category: "System",
    downloadUrl: "#",
    size: "24 MB"
  },
  {
    id: 3,
    title: "Bộ hình nền 4K",
    description: "Tổng hợp 100+ hình nền chủ đề Cyberpunk siêu nét.",
    detailContent: "Bộ sưu tập tuyển chọn từ các artist nổi tiếng...",
    version: "Pack 1",
    date: "2024-01-15",
    category: "Media",
    downloadUrl: "#",
    size: "1.2 GB"
  },
];

// 2. Định nghĩa kiểu dữ liệu cho props (Quan trọng với Next.js 16)
interface Props {
  params: Promise<{ id: string }>;
}

// 3. Component chính
export default async function SoftwareDetail({ params }: Props) {
  
  // BẮT BUỘC: Phải dùng 'await' để lấy id ra
  const { id } = await params;
  
  // Chuyển id từ chuỗi sang số để tìm
  const softwareId = parseInt(id);

  // Tìm bài viết trong kho dữ liệu
  const item = softwares.find((s) => s.id === softwareId);

  // Nếu không thấy (ví dụ gõ link bậy bạ) -> Báo lỗi 404
  if (!item) {
    return notFound();
  }

  // Giao diện hiển thị
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header nút quay lại */}
      <header className="bg-white border-b py-4 px-6 mb-8 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="text-gray-500 hover:text-blue-600 flex items-center text-sm font-medium">
                &larr; Quay lại trang chủ
            </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        
        {/* Khối thông tin chính */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Ảnh đại diện giả lập */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-lg shadow-blue-200">
                {item.title.charAt(0)}
            </div>

            <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                        {item.category}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        {item.version}
                    </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                
                <div className="mt-4 flex gap-4 text-sm text-gray-400 font-mono">
                   <span>{item.date}</span> • <span>{item.size}</span>
                </div>
            </div>
        </div>

        {/* Nút tải xuống (To và Rõ) */}
        <div className="mb-8">
            <a href={item.downloadUrl} className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition active:scale-95">
                <span>Tải Xuống Ngay</span>
                <span className="text-blue-200 text-sm font-normal">({item.size})</span>
            </a>
            <p className="text-center text-xs text-gray-400 mt-2">
                ✅ File sạch 100% • Server tốc độ cao
            </p>
        </div>

        {/* Nội dung chi tiết */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Thông tin chi tiết</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {item.detailContent}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                ⚠️ <strong>Lưu ý:</strong> Nếu link tải bị lỗi, vui lòng báo cáo lại cho Admin.
            </div>
        </div>

      </div>
    </main>
  );
}