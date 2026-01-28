import { allItems } from '../../data';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { id: string }
};

// 1. TẠO TIÊU ĐỀ ĐỘNG (SEO)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const item = allItems.find((p) => String(p.id) === params.id);
  
  if (!item) {
    return { title: 'Không tìm thấy tài nguyên' };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      images: [item.imageUrl],
    },
  };
}

// 2. GIAO DIỆN TRANG CHI TIẾT
export default function SoftwareDetail({ params }: Props) {
  // Tìm dữ liệu dựa trên ID trên URL
  const item = allItems.find((p) => String(p.id) === params.id);

  // Nếu không thấy -> Chuyển sang trang 404
  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* BACKGROUND HIỆU ỨNG (Trang trí) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="max-w-5xl mx-auto pt-10 px-4">
        
        {/* Breadcrumb (Đường dẫn) */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <span>/</span>
          <Link href={`/?cat=${item.category}`} className="hover:text-blue-600 transition">{item.category}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI: ẢNH & THÔNG TIN CƠ BẢN */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Ảnh Cover đẹp mắt */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold rounded-lg shadow-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Tiêu đề & Mô tả */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1">📅 {item.date}</span>
                <span className="flex items-center gap-1">👁️ {item.views || 0} lượt xem</span>
                <span className="flex items-center gap-1">✍️ Admin</span>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-lg font-medium">{item.description}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Tính năng nổi bật:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Giao diện thân thiện, dễ sử dụng.</li>
                  <li>Tốc độ xử lý nhanh chóng, tối ưu hóa hiệu năng.</li>
                  <li>Hỗ trợ đa nền tảng (Windows, Mac, Linux).</li>
                  <li>Cập nhật thường xuyên với nhiều tính năng mới.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: NÚT DOWNLOAD & SIDEBAR */}
          <div className="space-y-6">
            
            {/* Box Download */}
            <div className="sticky top-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tải xuống ngay</h3>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Free
              </button>
              
              <p className="text-center text-xs text-slate-500 mb-6">
                🔒 An toàn 100% • Đã quét virus
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phiên bản:</span>
                  <span className="font-medium text-slate-900 dark:text-white">v1.0.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="font-medium text-slate-900 dark:text-white">150 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Bản quyền:</span>
                  <span className="text-green-600 font-bold uppercase text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                    Miễn phí
                  </span>
                </div>
              </div>
            </div>

            {/* Box Gợi ý */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Có thể bạn thích</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                    <div className="w-16 h-12 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden">
                       <img src={`https://picsum.photos/seed/${i + 10}/200/150`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition">
                        Phần mềm tiện ích số {i}
                      </h4>
                      <span className="text-xs text-slate-500">Video • 2 ngày trước</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}