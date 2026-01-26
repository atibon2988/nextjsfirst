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

  if (!item) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header Back */}
      <header className="bg-white/90 backdrop-blur-md border-b py-4 px-6 mb-0 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
            <Link href="/" className="text-gray-500 hover:text-blue-600 flex items-center text-sm font-medium transition">
                &larr; Quay lại trang chủ
            </Link>
        </div>
      </header>

      {/* --- PHẦN ẢNH BÌA LỚN (BANNER) --- */}
      <div className="w-full h-64 md:h-80 bg-gray-200 relative">
         {item.imageUrl ? (
             <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
             />
         ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-800">No Cover Image</div>
         )}
         {/* Lớp phủ đen mờ để chữ dễ đọc hơn nếu muốn viết đè lên */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        
        {/* Khối Tiêu đề & Thông tin */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 mb-6">
            <div className="flex gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {item.category}
                </span>
                <span className="text-gray-400 text-xs flex items-center">📅 {item.date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
            <p className="text-xl text-gray-500 font-light">{item.description}</p>
        </div>

         {item.category !== 'Tin tức' && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href={item.downloadUrl} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition active:scale-95">
                    {item.category === 'Video' ? '▶️ Xem Video' : '⬇️ Tải Xuống Ngay'}
                </a>
                <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-lg py-4 rounded-xl hover:bg-gray-50 transition">
                    ❤️ Yêu thích
                </button>
            </div>
        )}

        {/* --- NỘI DUNG CHI TIẾT THẬT --- */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Thông tin chi tiết</h3>
            
            {/* Class 'whitespace-pre-line' giúp hiển thị đúng các dòng xuống dòng bạn viết trong data.ts */}
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {/* Nếu bài viết chưa có detailContent thì hiện dòng chữ mặc định */}
                {item.detailContent ? item.detailContent : "Bài viết này đang được cập nhật nội dung..."}
            </div>
        </div>
      </div>
    </main>
  );
}