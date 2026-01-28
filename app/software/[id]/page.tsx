// File: app/software/[id]/page.tsx

import { allItems } from '../../data'; // Import dữ liệu chuẩn
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { id: string }
};

// 1. TẠO METADATA (SEO & Tiêu đề Tab)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Tìm bài viết (so sánh chuỗi với chuỗi)
  const item = allItems.find((p) => p.id === params.id);
  
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

// 2. GIAO DIỆN CHI TIẾT (FULL ĐẸP)
export default function SoftwareDetail({ params }: Props) {
  const item = allItems.find((p) => p.id === params.id);

  // Nếu không thấy bài -> 404
  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* --- BACKGROUND HIỆU ỨNG --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto pt-10 px-4">
        
        {/* --- BREADCRUMB (Đường dẫn) --- */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <span>/</span>
          <Link href={`/?cat=${item.category}`} className="hover:text-blue-600 transition">{item.category}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CỘT TRÁI: NỘI DUNG CHÍNH --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Ảnh Cover */}
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

            {/* Thông tin bài viết */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1">📅 {item.date}</span>
                <span className="flex items-center gap-1">👁️ {item.views.toLocaleString()} lượt xem</span>
                <span className="flex items-center gap-1">✍️ Admin</span>
              </div>

              {/* Nội dung mô tả */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-lg font-medium border-l-4 border-blue-500 pl-4 italic bg-blue-50 dark:bg-blue-900/20 py-2 pr-2 rounded-r-lg">
                  {item.description}
                </p>
                
                <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Giới thiệu chi tiết</h3>
                <p>
                    Đây là phiên bản mới nhất được cập nhật trên hệ thống. 
                    Phần mềm/Game này đã được kiểm duyệt kỹ lưỡng về độ an toàn và tính năng.
                    Dưới đây là một số điểm nổi bật bạn không nên bỏ qua:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-blue-500">
                    <li>Giao diện người dùng thân thiện, tối ưu hóa trải nghiệm.</li>
                    <li>Tốc độ xử lý nhanh, mượt mà trên mọi thiết bị.</li>
                    <li>Hỗ trợ cập nhật tự động các bản vá lỗi mới nhất.</li>
                    <li>Không chứa quảng cáo làm phiền người dùng.</li>
                </ul>
                <p className="mt-4">
                  Hãy tải xuống ngay ở mục bên phải (hoặc bên dưới nếu dùng điện thoại) để trải nghiệm nhé!
                </p>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: DOWNLOAD & SIDEBAR --- */}
          <div className="space-y-6">
            
            {/* Box Download (Sticky: Luôn bám theo khi cuộn) */}
            <div className="sticky top-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl z-10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                🚀 Tải xuống ngay
              </h3>
              
              <a 
                href={item.downloadUrl || '#'} 
                className="group w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-3 text-center"
              >
                <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span>Download Free</span>
              </a>
              
              <p className="text-center text-xs text-slate-500 mb-6 flex items-center justify-center gap-1">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Link gốc an toàn 100%
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phiên bản:</span>
                  <span className="font-medium text-slate-900 dark:text-white">Mới nhất</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Dung lượng:</span>
                  <span className="font-medium text-slate-900 dark:text-white">~Unknown</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Bản quyền:</span>
                  <span className="text-green-600 font-bold uppercase text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">Miễn phí</span>
                </div>
              </div>
            </div>

            {/* Box Gợi ý (Có thể phát triển thêm logic lấy bài cùng loại) */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Có thể bạn thích</h3>
              <div className="space-y-4">
                {/* Lấy 3 bài đầu tiên làm gợi ý */}
                {allItems.slice(0, 3).map((suggestion) => (
                  <Link key={suggestion.id} href={`/software/${suggestion.id}`} className="flex gap-3 group cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 p-2 rounded-xl transition">
                    <div className="w-20 h-14 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                       <img src={suggestion.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition">
                        {suggestion.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {suggestion.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}