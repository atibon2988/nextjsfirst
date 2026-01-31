"use client";

import { useEffect, useState } from "react"; // Bỏ useMemo ở đây nếu không cần thiết
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

// 1. Khai báo ReactQuill bằng dynamic ở NGOÀI cùng (không dùng hook ở đây)
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-80 bg-slate-100 animate-pulse rounded-xl"></div>
});

import 'react-quill-new/dist/quill.snow.css';

// State quản lý Form


export default function AdminPage() {
  // --- TẤT CẢ HOOKS PHẢI NẰM Ở ĐÂY ---


// State bổ sung cho tính năng Edit và Danh sách
const [isEditing, setIsEditing] = useState(false); // Theo dõi đang thêm hay sửa
const [posts, setPosts] = useState<any[]>([]);     // Lưu danh sách bài viết để hiện bên dưới
  // Hàm 1: Tự động tạo Slug (Cho vào bất cứ đâu bên trong AdminPage)
const generateSlug = (text: string) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "").replace(/(\s+)/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");
};

// Hàm 2: Lấy dữ liệu khi nhấn nút "Sửa"
const handleEditClick = (post: any) => {
  setIsEditing(true);
  setForm({
    id: post.id, title: post.title, description: post.description,
    image_url: post.image_url, category: post.category, download_url: post.download_url
  });
  setDetailContent(post.detail_content);
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu để sửa cho dễ
};

// Hàm 3: Lấy danh sách bài viết từ Supabase để hiện ở dưới
const fetchPosts = async () => {
  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (data) setPosts(data);
};

// Gọi fetchPosts khi vừa vào trang
useEffect(() => { fetchPosts(); }, []);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [form, setForm] = useState({
    id: '', title: '', description: '', image_url: '', 
    category: 'Phần mềm', download_url: ''
  });
  const [detailContent, setDetailContent] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  // 2. Hàm xử lý đăng bài
  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();
  const postData = { ...form, detail_content: detailContent, created_at: new Date().toISOString() };

  // Nếu đang sửa thì dùng .update(), nếu không thì dùng .insert()
  const { error } = isEditing 
    ? await supabase.from('posts').update(postData).eq('id', form.id) 
    : await supabase.from('posts').insert([postData]);

  if (error) return alert("Lỗi: " + error.message);
  
  alert(isEditing ? "Đã cập nhật!" : "Đã đăng bài!");
  // Reset form và tải lại danh sách
  setIsEditing(false);
  setForm({ id: '', title: '', description: '', image_url: '', category: 'Phần mềm', download_url: '' });
  setDetailContent('');
  fetchPosts(); 
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="p-20 text-center">Đang kiểm tra quyền...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white dark:bg-slate-950 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Quản trị AnyThink</h1>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Đăng xuất</button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ô Tiêu đề: Khi gõ sẽ tự điền Slug vào ô ID */}
          <div className="space-y-2">
            <label className="text-sm font-bold">Tiêu đề bài viết</label>
            <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none" value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm({ ...form, title: title, id: isEditing ? form.id : generateSlug(title) });
              }} required />
          </div>

          {/* Ô Slug: Bị khóa (readOnly) khi đang sửa để tránh hỏng link */}
          <div className="space-y-2">
           <label className="text-sm font-bold">Slug (ID tự động)</label>
            <input type="text" className={`w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none ${isEditing ? 'bg-slate-200' : ''}`} 
              value={form.id} readOnly={isEditing}
              onChange={(e) => setForm({...form, id: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">Link ảnh (URL)</label>
            <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none"
              value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Danh mục</label>
            <select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none"
              value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>Tin tức</option><option>Game</option><option>Video</option>
              <option>Ảnh</option><option>Phần mềm</option><option>Nhạc</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Mô tả ngắn</label>
          <textarea className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none h-24"
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Link tải phần mềm</label>
          <input type="text" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none"
            value={form.download_url} onChange={e => setForm({...form, download_url: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Nội dung chi tiết (Rich Text)</label>
          <div className="bg-white text-black rounded-2xl overflow-hidden border border-slate-200">
            <ReactQuill theme="snow" value={detailContent} onChange={setDetailContent} className="h-80 mb-12" />
          </div>
        </div>

        <button type="submit" className="w-full py-5 bg-blue-600 text-white font-bold rounded-3xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
          XUẤT BẢN BÀI VIẾT NGAY
        </button>
      </form>
      <div className="mt-20 border-t pt-10">
        <h2 className="text-2xl font-bold mb-6">Quản lý bài viết</h2>
        <div className="grid gap-4">
          {posts.map((p) => (
            <div key={p.id} className="p-4 bg-white dark:bg-slate-900 border rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={p.image_url} className="w-10 h-10 object-cover rounded-lg" />
                <span className="font-medium text-sm line-clamp-1">{p.title}</span>
              </div>
              <button onClick={() => handleEditClick(p)} className="text-blue-600 font-bold hover:underline">Sửa</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}