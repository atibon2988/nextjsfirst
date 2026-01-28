import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allItems } from '../../data';

interface Props {
  params: Promise<{ id: string }>;
}
import { allItems } from '@/app/data'; // Import dữ liệu của bạn
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
};

// Hàm này chạy trước khi trang load để tạo tiêu đề động
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Tìm bài viết theo ID
  const item = allItems.find((p) => p.id === params.id);
  
  return {
    title: item ? item.title : 'Không tìm thấy', // Nếu có bài thì lấy tên, không thì báo lỗi
    description: item ? item.description : 'Chi tiết phần mềm tải miễn phí.',
    openGraph: {
      images: [item?.imageUrl || '/logo.png'], // Khi share Facebook sẽ hiện ảnh phần mềm này
    },
  };
}
export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const itemId = parseInt(id);
  const item = allItems.find((s) => s.id === itemId);

  if (!item) return notFound();

  // --- LOGIC MỚI: LỌC BÀI VIẾT LIÊN QUAN ---
  // 1. Cùng danh mục (item.category)
  // 2. Khác bài hiện tại (s.id !== item.id)
  // 3. Lấy tối đa 3 bài (.slice(0, 3))
  const relatedItems = allItems
    .filter((s) => s.category === item.category && s.id !== item.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen pb-20">
      
      {/* 1. ẢNH BÌA */}
      <div className="w-full h-64 md:h-96 bg-gray-900 relative">
         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80" />
         <div className="absolute top-4 left-4 z-20">
             <Link href="/" className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium hover:bg-black/70 transition flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Quay lại
             </Link>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        
        {/* 2. KHỐI TIÊU ĐỀ */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
            <div className="flex gap-2 mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/30">{item.category}</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">📅 {item.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{item.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light">{item.description}</p>
        </div>

        {/* 3. KHỐI NỘI DUNG */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-blue-600 pl-3">
                Thông tin chi tiết
            </h3>
            
            <div className="prose max-w-none text-gray-700 dark:text-gray-300 leading-8 whitespace-pre-line text-lg">
                {item.detailContent ? item.detailContent : "Đang cập nhật..."}
            </div>
        </div>

        {/* 4. NÚT TẢI (Không hiện nếu là Tin tức) */}
        {item.category !== 'Tin tức' && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-blue-100 dark:border-slate-700 mb-12 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href={item.downloadUrl} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/30 transition transform active:scale-95">
                        ⬇️ Tải Xuống Ngay
                    </a>
                    <button className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-white font-bold text-lg py-4 rounded-xl hover:opacity-80 transition active:scale-95 flex items-center justify-center gap-2">
                        ❤️ Yêu thích
                    </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-3">🔒 Link an toàn • Đã kiểm duyệt bởi Admin</p>
            </div>
        )}

        {/* --- 5. TÍNH NĂNG MỚI: BÀI VIẾT LIÊN QUAN --- */}
        {relatedItems.length > 0 && (
            <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    💡 Có thể bạn cũng thích
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedItems.map((related) => (
                        <Link href={`/software/${related.id}`} key={related.id} className="group block h-full">
                            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                <div className="h-40 w-full overflow-hidden relative">
                                    <img 
                                        src={related.imageUrl} 
                                        alt={related.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/50 text-white backdrop-blur-md">
                                            {related.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {related.title}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

      </div>
    </main>
  );
}