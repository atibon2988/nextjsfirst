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

export default function AdminPage() {
  // --- TẤT CẢ HOOKS PHẢI NẰM Ở ĐÂY ---
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
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title) return alert("Vui lòng nhập ID và Tiêu đề!");

    const { error } = await supabase.from('posts').insert([{
      ...form,
      detail_content: detailContent, // Lấy từ trình soạn thảo
      created_at: new Date().toISOString()
    }]);

    if (error) {
      alert("Lỗi đăng bài: " + error.message);
    } else {
      alert("🎉 Chúc mừng! Bài viết đã lên sóng.");
      router.push("/"); // Về trang chủ xem thành quả
    }
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

      <form onSubmit={handlePost} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold">ID bài viết (slug - không dấu)</label>
            <input type="text" placeholder="ví dụ: capcut-pro-2026" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500"
              value={form.id} onChange={e => setForm({...form, id: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Tiêu đề bài viết</label>
            <input type="text" placeholder="Nhập tiêu đề hiển thị" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
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
    </div>
  );
}