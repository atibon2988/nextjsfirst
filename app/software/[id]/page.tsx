import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. Dữ liệu giả (Copy từ trang chủ sang để đối chiếu)
const softwares = [
  {
    id: 1,
    title: "VS Code for Android",
    description: "Trình soạn thảo code tốt nhất, phiên bản chạy trên trình duyệt cho Android. Hỗ trợ đầy đủ Extension, Terminal và Git.",
    detailContent: "Đây là nội dung chi tiết dài hơn... Hướng dẫn cài đặt: B1. Tải về. B2. Cài đặt code-server...",
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

// 2. Component chính nhận vào tham số params (chứa id)
export default function SoftwareDetail({ params }: { params: { id: string } }) {
  
  // Lấy ID từ đường dẫn (URL) và đổi thành số
  const softwareId = parseInt(params.id);

  // Tìm trong kho dữ liệu xem có phần mềm nào trùng ID không
  const item = softwares.find((s) => s.id === softwareId);

  // Nếu tìm không thấy (ví dụ gõ /software/999) thì báo lỗi 404
  if (!item) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header đơn giản */}
      <header className="bg-white border-b py-4 px-6 mb-8">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="text-gray-500 hover:text-blue-600 flex items-center text-sm font-medium">
                &larr; Quay lại
            </Link>
        </div>
      </header>

      {/* Nội dung chính */}
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Phần Header bài viết */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-8 items-start">
            {/* Giả lập ảnh đại diện phần mềm */}
            <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-lg shadow-blue-200">
                {item.title.charAt(0)}
            </div>

            <div className="flex-1">
                <div className="flex gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                        {item.category}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        {item.version}
                    </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 Cập nhật: {item.date}</span>
                    <span>💾 Dung lượng: {item.size}</span>
                </div>
            </div>
        </div>

        {/* Nút tải xuống (Call to Action) */}
        <div className="mb-8">
            <a href={item.downloadUrl} className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition transform active:scale-95">
                ⬇️ Tải Xuống Ngay ({item.size})
            </a>
            <p className="text-center text-xs text-gray-400 mt-2">
                File đã được quét virus an toàn.
            </p>
        </div>

        {/* Nội dung chi tiết bài viết */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose max-w-none">
            <h3 className="text-xl font-bold mb-4">Thông tin chi tiết</h3>
            <p className="text-gray-700 whitespace-pre-line">
                {item.detailContent}
            </p>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">⚠️ Lưu ý khi cài đặt:</h4>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                    <li>Vui lòng gỡ phiên bản cũ trước khi cài đặt.</li>
                    <li>Cấp quyền truy cập bộ nhớ nếu ứng dụng yêu cầu.</li>
                </ul>
            </div>
        </div>

      </div>
    </main>
  );
}