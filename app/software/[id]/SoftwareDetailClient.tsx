"use client"; // [THÊM] Bắt buộc vì dùng useState/useEffect cho tương tác DB
import { allItems } from '../../data';
import { notFound } from 'next/navigation';
import { useState, useEffect } from "react"; // [THÊM]
import { supabase } from "../../lib/supabase";
import Link from 'next/link';


interface ClientProps {
  item: any;
  recentItems: any[];
  relatedOldItems: any[];
}


function formatRelativeTime(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Vừa xong";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} ngày trước`;

  // Nếu quá lâu thì hiện ngày tháng cụ thể
  return past.toLocaleDateString('vi-VN');
}

export default function SoftwareDetailClient({ item, recentItems = [], relatedOldItems = [] }: any) {
//  const { id } = await params;
//  const item = allItems.find((p) => p.id === id);
// --- [THÊM] Các State cho tương tác DB ---

  const [id, setId] = useState<string | null>(null);
  const [dbStats, setDbStats] = useState({ views: 0, likes: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  // Trong phần khai báo State, cập nhật commentForm
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });

  // 1. Lấy dữ liệu tĩnh từ data.ts (Sử dụng useEffect thay cho await trực tiếp để đồng bộ Client side)
//  const [item, setItem] = useState<any>(null);
  
  useEffect(() => {
  if (!item?.id) return;

  const initData = async () => {
    // 1. Tăng lượt xem (RPC)
    await supabase.rpc('increment_views', { post_id: item.id });

    // 2. Lấy Stats (Views/Likes) từ DB
    const { data: statsData } = await supabase
      .from('stats')
      .select('views, likes')
      .eq('id', item.id)
      .single();
    if (statsData) setDbStats(statsData);

    // 3. LẤY BÌNH LUẬN CŨ (Đây là phần bạn đang thiếu)
    const { data: commentData, error: commentError } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', item.id)
      .order('created_at', { ascending: false }); // Hiện bình luận mới nhất lên đầu

    if (commentError) {
      console.error("Lỗi lấy bình luận:", commentError.message);
    } else if (commentData) {
      setComments(commentData); // Cập nhật danh sách bình luận vào State
    }

    // 4. Kiểm tra xem máy này đã Like chưa
    if (localStorage.getItem(`liked_${item.id}`)) {
      setIsLiked(true);
    }
  };

  initData();
}, [item.id]);

  if (!item && id) return null; // Tránh nháy giao diện khi đang load id
  if (!item && !id) return notFound();

  // --- [THÊM] Các hàm xử lý (Handlers) ---
  const handleLike = async () => {
  if (isLiked || !item?.id) return; // Dùng item.id thay vì id
  
  const { error } = await supabase.rpc('increment_likes', { post_id: item.id });
  
  if (error) {
    console.error("Lỗi Like:", error.message);
    return;
  }
  
  setDbStats(prev => ({ ...prev, likes: prev.likes + 1 }));
  setIsLiked(true);
  localStorage.setItem(`liked_${item.id}`, 'true');
};

const handleComment = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!commentForm.name || !commentForm.email || !commentForm.content) return;

  const { data, error } = await supabase
    .from('comments')
    .insert([{ 
      post_id: item.id, 
      user_name: commentForm.name, 
      email: commentForm.email, // THÊM DÒNG NÀY ĐỂ LƯU EMAIL
      content: commentForm.content 
    }])
    .select();

  if (!error && data) {
    setComments([data[0], ...comments]);
    setCommentForm({ name: '', email: '', content: '' }); // Reset form
  }
};
  if (!item) notFound();

  // 1. Lấy danh sách bài viết mới nhất (Gợi ý bên phải)
//  const recentItems = allItems
//    .filter(i => i.id !== id)
//    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   // .slice(0, 4);

  // 2. Lấy bài viết cũ hơn cùng chuyên mục
//  const relatedOldItems = allItems
//    .filter(i => i.category === item.category && i.id !== id && new Date(i.date) < new Date(item.date))
//    .slice(0, 5);
    const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href, // Lấy link hiện tại
        });
      } catch (err) {
        console.log('User cancelled or error:', err);
      }
    } else {
    // Nếu trình duyệt cũ không hỗ trợ, ta sẽ tự copy link vào clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Đã copy link bài viết vào bộ nhớ đệm!');
    }
  };
  const isNews = item.category === "Tin tức";

  return (
    <> {/* Mở Fragment - Thẻ cha ảo */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
      "name": item.title,
      "operatingSystem": "Windows, Android",
      "applicationCategory": "MultimediaApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": item.views
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  }}
/>

    <div className="min-h-screen pb-20 pt-10 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI (NỘI DUNG CHÍNH) --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition">
              Trang chủ
            </Link>
            <span>/</span>
            {/* Chuyển text thành Link, truyền tên danh mục vào tham số 'cat' */}
            <Link 
              href={`/?cat=${item.category}`} 
              className="font-medium text-slate-900 dark:text-white hover:text-blue-600 transition"
            >
              {item.category}
            </Link>
          </nav>

          <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <img src={item.image_url} alt={item.title} className="w-full aspect-video object-cover" />
            
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
              <div className="flex gap-4 text-sm text-slate-500 mb-6 border-b pb-6 dark:border-slate-800">
                <span>📅 {item.date}</span>
                <span>👁️ {dbStats.views.toLocaleString()} lượt xem</span>
              </div>


              {/* 1. Phần Description - Dùng thẻ div thay vì p nếu nội dung có thể chứa block element */}
              <div className="mb-10">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-8 italic border-l-4 border-blue-500 pl-4 bg-blue-50/50 dark:bg-blue-900/10 py-4 rounded-r-2xl">
                  {item.description}
                </p>

                <div 
                  className="prose dark:prose-invert max-w-none detail-content"
                  dangerouslySetInnerHTML={{ __html: item.detail_content || "Đang cập nhật nội dung chi tiết..." }} 
                />
                
              </div>

              {/* TƯƠNG TÁC (Yêu thích & Share) */}
              <div className="flex gap-4 pt-6 border-t dark:border-slate-800">
              {/* [SỬA] Nút yêu thích với logic DB */}
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${isLiked ? 'bg-red-100 text-red-600' : 'bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-900/20'}`}
                  >
                    ❤️ {isLiked ? 'Đã thích' : 'Yêu thích'} ({dbStats.likes})
                  </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-slate-300"
                >
                  🔗 Chia sẻ
                </button>
              </div>
            </div>
          </div>

          {/* DOWNLOAD BUTTON (Ẩn nếu là tin tức) */}
          {!isNews && (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center shadow-lg shadow-blue-500/30">
              <h2 className="text-2xl font-bold mb-2 bg-white dark:bg-slate-900">Sẵn sàng trải nghiệm?</h2>
              <p className="mb-6 opacity-90 bg-white dark:bg-slate-900">Tải xuống phiên bản mới nhất hoàn toàn miễn phí.</p>
              <Link href={`/download/${item.id}`} className="px-10 py-4 bg-green-700 text-white rounded-2xl font-bold text-lg hover:scale-105 transition shadow-xl">
                TẢI XUỐNG NGAY
              </Link>
            </div>
          )}
          

            {/* COMMENT SECTION [NÂNG CẤP] */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6">Bình luận ({comments.length})</h3>
              <form onSubmit={handleComment} className="space-y-4 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Tên của bạn *" 
                    className="p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-blue-500" 
                    value={commentForm.name}
                    onChange={e => setCommentForm({...commentForm, name: e.target.value})}
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Email *" 
                    className="p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-blue-500" 
                    required 
                    value={commentForm.email}
                    onChange={e => setCommentForm({...commentForm, email: e.target.value})}
                  />                
                </div>
                <textarea 
                  placeholder="Nội dung bình luận..." 
                  rows={4} 
                  className="w-full p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none focus:border-blue-500"
                  value={commentForm.content}
                  onChange={e => setCommentForm({...commentForm, content: e.target.value})}
                  required
                ></textarea>
                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Gửi bình luận</button>
              </form>

              {/* Danh sách bình luận thật từ DB */}
              <div className="space-y-6">
                {comments.map((cm, idx) => (
                  <div key={idx} className="flex gap-4 border-b dark:border-slate-800 pb-4">
                    {/* Avatar tự động */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 flex-shrink-0">
                      {cm.user_name ? cm.user_name.charAt(0).toUpperCase() : 'A'}
                    </div>
      
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-blue-600 dark:text-blue-400">{cm.user_name}</span>
                        {/* SỬA THỜI GIAN Ở ĐÂY */}
                        <span className="text-[10px] text-slate-400">
                          {cm.created_at ? formatRelativeTime(cm.created_at) : 'Vừa xong'}
                        </span>
                      </div>
                      {/* KIỂM TRA TÊN CỘT Ở ĐÂY: Phải là cm.content nếu trong DB bạn đặt là content */}
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {cm.content} 
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          {/* BÀI VIẾT CŨ HƠN CÙNG CHUYÊN MỤC */}
          {relatedOldItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3">Bài viết cũ hơn</h3>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 divide-y dark:divide-slate-800">
                {relatedOldItems.map(old => (
                  <Link key={old.id} href={`/software/${old.id}`} className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300">
                    • {old.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- CỘT PHẢI (SIDEBAR) --- */}
        <div className="space-y-8">
          {/* Download Box (Sticky cho Desktop) */}
          {!isNews && (
            <div className="sticky top-24 mt-9 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl hidden lg:block">
              <h3 className="font-bold mb-4">Thông tin tải về</h3>
              <a href={item.downloadUrl} className="w-full block text-center py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition mb-4">
                Download Free
              </a>
              <p className="text-xs text-slate-500 text-center italic">🔒 An toàn & Đã quét virus</p>
            </div>
          )}

          {/* BÀI VIẾT MỚI GỢI Ý */}
          <div className="sticky top-24 mt-9 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold mb-6 text-blue-600">Mới cập nhật</h3>
            <div className="space-y-6">
              {recentItems.map(recent => (
                <Link key={recent.id} href={`/software/${recent.id}`} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={recent.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold line-clamp-2 group-hover:text-blue-600 transition">{recent.title}</h4>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{recent.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </>  
  );
}