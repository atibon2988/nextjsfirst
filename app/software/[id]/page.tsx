// File: app/software/[id]/page.tsx

import { allItems } from '../../data'; // Dùng đường dẫn này cho an toàn
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { id: string }
};

// 1. TẠO METADATA (SEO)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // So sánh trực tiếp: string === string (An toàn tuyệt đối)
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

// 2. GIAO DIỆN CHI TIẾT
export default function SoftwareDetail({ params }: Props) {
  const item = allItems.find((p) => p.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto pt-10 px-4">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">Trang chủ</Link>
          <span>/</span>
          <Link href={`/?cat=${item.category}`} className="hover:text-blue-600 transition">{item.category}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{item.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI */}
          <div className="lg:col-span-2 space-y-8">
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

            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <span className="flex items-center gap-1">📅 {item.date}</span>
                {/* Đã có views trong data.ts nên dòng này sẽ hết lỗi */}
                <span className="flex items-center gap-1">👁️ {item.views} lượt xem</span>
                <span className="flex items-center gap-1">✍️ Admin</span>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-lg font-medium">{item.description}</p>
                <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Giới thiệu chi tiết</h3>
                <p>
                    Đây là nội dung mô phỏng chi tiết cho bài viết. Bạn có thể thêm các thẻ HTML, 
                    hình ảnh minh họa hoặc hướng dẫn sử dụng tại đây.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Tính năng nổi bật 1</li>
                    <li>Tính năng nổi bật 2</li>
                    <li>Hướng dẫn cài đặt chi tiết</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Tải xuống ngay</h3>
              <a 
                href={item.downloadUrl || '#'} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 mb-3 block text-center"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Free
              </a>
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Phiên bản:</span>
                  <span className="font-medium text-slate-900 dark:text-white">Latest</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Bản quyền:</span>
                  <span className="text-green-600 font-bold uppercase text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">Miễn phí</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}