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
      


      {/* 2. Ảnh Bìa (Banner) */}
      <div className="w-full h-64 md:h-96 bg-gray-900 relative group">
         {item.imageUrl ? (
             <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-90"
             />
         ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-500">No Cover Image</div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* 3. Nội dung chính */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        
        {/* Khối Tiêu đề */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-blue-200 shadow-lg">
                    {item.category}
                </span>
                <span className="text-gray-400 text-xs flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    📅 {item.date}
                </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{item.title}</h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed">{item.description}</p>
        </div>

        {/* Khối Bài viết chi tiết */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-3">
                Thông tin chi tiết
            </h3>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-8 whitespace-pre-line">
                {item.detailContent ? item.detailContent : "Bài viết này đang được cập nhật nội dung..."}
            </div>
        </div>

        {/* 4. Khối Nút Tải Xuống (Đã chuyển xuống dưới cùng) */}
        {/* Chỉ hiện nút tải nếu KHÔNG phải là tin tức */}
        {item.category !== 'Tin tức' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 sticky bottom-4 z-20">
                <div className="text-center mb-4 text-sm text-gray-500">
                    Bạn đang xem mục <strong>{item.title}</strong>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href={item.downloadUrl} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition transform active:scale-95">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        {item.category === 'Video' ? 'Xem Video Ngay' : 'Tải Xuống Ngay'}
                    </a>
                    
                    <button className="flex items-center justify-center gap-2 bg-pink-50 border border-pink-100 text-pink-600 font-bold text-lg py-4 rounded-xl hover:bg-pink-100 transition active:scale-95">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        Yêu thích
                    </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-3">
                    🔒 Link an toàn • Đã kiểm duyệt bởi Admin
                </p>
            </div>
        )}

      </div>
    </main>
  );
}