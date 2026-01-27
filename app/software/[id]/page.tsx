import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allItems } from '../../data';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const itemId = parseInt(id);
  const item = allItems.find((s) => s.id === itemId);

  if (!item) return notFound();

  return (
    <main className="min-h-screen pb-20">
      
      {/* 1. ẢNH BÌA */}
      <div className="w-full h-64 md:h-96 bg-gray-900 relative">
         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80" />
         <div className="absolute top-4 left-4 z-20">
             <Link href="/" className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium hover:bg-black/70 transition">
                &larr; Quay lại
             </Link>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        
        {/* 2. KHỐI TIÊU ĐỀ (Thêm dark:bg-slate-800 dark:text-white) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
            <div className="flex gap-2 mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{item.category}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">📅 {item.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{item.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light">{item.description}</p>
        </div>

        {/* 3. KHỐI NỘI DUNG (Thêm dark:bg-slate-800 dark:text-gray-300) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-blue-600 pl-3">
                Thông tin chi tiết
            </h3>
            
            <div className="prose max-w-none text-gray-700 dark:text-gray-300 leading-8 whitespace-pre-line text-lg">
                {item.detailContent ? item.detailContent : "Đang cập nhật..."}
            </div>
        </div>

        {/* 4. NÚT TẢI (Thêm dark:bg-slate-800) */}
        {item.category !== 'Tin tức' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-slate-700 sticky bottom-4 z-20 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href={item.downloadUrl} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition active:scale-95">
                        ⬇️ Tải Xuống Ngay
                    </a>
                    <button className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white font-bold text-lg py-4 rounded-xl hover:opacity-80 transition">
                        ❤️ Yêu thích
                    </button>
                </div>
            </div>
        )}
      </div>
    </main>
  );
}