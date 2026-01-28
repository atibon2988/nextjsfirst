"use client";

import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Góp ý & Báo lỗi', // Tab sẽ hiện: "Góp ý & Báo lỗi | AnyThink"
  description: 'Gửi đóng góp ý kiến để xây dựng cộng đồng AnyThink tốt hơn.',
};

export default function FeedbackPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Giả lập gửi API mất 1.5 giây
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Cột trái: Thông tin */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Chúng tôi luôn <br/>
            <span className="text-blue-600">lắng nghe bạn.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Bạn phát hiện lỗi? Hay có ý tưởng tính năng mới? Đừng ngần ngại chia sẻ với AnyThink để chúng tôi phục vụ tốt hơn.
          </p>
          
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Email hỗ trợ</p>
                <p className="font-medium text-slate-900 dark:text-white">support@anythink.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Form Góp ý */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
          
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl">
            
            {status === 'success' ? (
              <div className="text-center py-12 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Đã gửi thành công!</h3>
                <p className="text-slate-600 dark:text-slate-400">Cảm ơn đóng góp quý báu của bạn.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-blue-600 font-medium hover:underline"
                >
                  Gửi thêm góp ý khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Gửi góp ý</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Họ tên</label>
                    <input required type="text" placeholder="Tên của bạn" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input required type="email" placeholder="email@vidu.com" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Loại góp ý</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition">
                    <option>Báo lỗi (Bug)</option>
                    <option>Yêu cầu tính năng mới</option>
                    <option>Góp ý nội dung</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nội dung</label>
                  <textarea required rows={4} placeholder="Mô tả chi tiết..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
                </div>

                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Đang gửi...
                    </>
                  ) : (
                    'Gửi ngay'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}