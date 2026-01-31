"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { allItems } from "../../data";
import Link from "next/link";

export default function DownloadPage() {
  const [count, setCount] = useState(10);
  const { id } = useParams();
  const router = useRouter();
  const item = allItems.find((i) => i.id === id);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (!item) return <div>Không tìm thấy tài nguyên</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border dark:border-slate-800 text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Chuẩn bị link tải cho bạn...</h2>
        <p className="text-slate-500 mb-6">{item.title}</p>

        <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          {/* Vòng tròn đếm ngược */}
          <svg className="w-full h-full rotate-[-90deg]">
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-800" />
            <circle 
              cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray="377" 
              strokeDashoffset={377 - (377 * (10 - count)) / 10}
              className="text-blue-600 transition-all duration-1000"
            />
          </svg>
          <span className="absolute text-3xl font-bold">{count}</span>
        </div>

        {count === 0 ? (
          <a href={item.downloadUrl} className="block w-full py-4 bg-green-600 text-white rounded-xl font-bold animate-bounce">
            BẤM VÀO ĐÂY ĐỂ TẢI XUỐNG
          </a>
        ) : (
          <p className="text-sm text-slate-400">Vui lòng đợi trong giây lát</p>
        )}
        
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-left">
          <p className="text-xs font-bold text-blue-600 uppercase mb-1">Lưu ý:</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Nếu có mật khẩu giải nén, hãy dùng: <span className="font-bold text-slate-900 dark:text-white">anythink.pro</span>
          </p>
        </div>
      </div>
    </div>
  );
}