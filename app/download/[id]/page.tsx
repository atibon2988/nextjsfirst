"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase"; // Đảm bảo đúng đường dẫn
import Link from "next/link";

export default function DownloadPage() {
  const [count, setCount] = useState(10);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // id này là slug từ URL

  // 1. Lấy dữ liệu bài viết từ Supabase
  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await supabase
        .from('posts')
        .select('title, download_url')
        .ilike('id', id as string)
        .single();
      
      if (data) setItem(data);
      setLoading(false);
    };
    fetchItem();
  }, [id]);

  // 2. Logic đếm ngược
  useEffect(() => {
    if (count > 0 && item) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, item]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang kiểm tra link tải...</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy tài nguyên</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Chuẩn bị link tải cho bạn...</h2>
        <p className="text-blue-600 font-medium mb-6 line-clamp-1 px-4">{item.title}</p>

        <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          {/* Vòng tròn đếm ngược (SVG) */}
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
            <circle 
              cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray="377" 
              strokeDashoffset={377 - (377 * (10 - count)) / 10}
              className="text-blue-600 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-3xl font-bold dark:text-white">{count}</span>
        </div>

        {count === 0 ? (
          <a 
            href={item.download_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold animate-bounce shadow-lg shadow-green-500/30 transition-all"
          >
            BẤM VÀO ĐÂY ĐỂ TẢI XUỐNG
          </a>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">Hệ thống đang kiểm tra tệp tin an toàn</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                    className="bg-blue-600 h-full transition-all duration-1000" 
                    style={{ width: `${(10 - count) * 10}%` }}
                ></div>
            </div>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl text-left border border-amber-100 dark:border-amber-900/30">
          <p className="text-xs font-bold text-amber-600 uppercase mb-1">🔑 Mật khẩu giải nén:</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-mono">
            anythink.pro
          </p>
        </div>

        <Link href="/" className="mt-6 inline-block text-xs text-slate-400 hover:text-blue-600 transition">
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}