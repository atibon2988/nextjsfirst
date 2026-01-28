"use client";

import { useState } from 'react';

export default function DonatePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const banks = [
    {
      id: 'mbbank',
      name: 'MB Bank (Quân Đội)',
      accountName: 'NGUYEN VAN A', // Thay tên bạn
      accountNumber: '123456789', // Thay số TK bạn
      logoColor: 'bg-blue-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
      )
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      accountName: 'NGUYEN VAN A',
      accountNumber: '0987654321', // Thay sđt Momo
      logoColor: 'bg-pink-600',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ủng hộ <span className="text-blue-600">AnyThink</span> 🚀
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Dự án được duy trì miễn phí nhờ sự đóng góp của cộng đồng. Một ly cà phê từ bạn là động lực to lớn để chúng tôi phát triển thêm nhiều tính năng mới!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banks.map((bank) => (
            <div key={bank.id} className="relative group overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl shadow-lg ${bank.logoColor}`}>
                  {bank.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">{bank.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Chuyển khoản 24/7</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Chủ tài khoản</p>
                  <p className="text-lg font-mono font-semibold text-slate-700 dark:text-slate-200">{bank.accountName}</p>
                </div>

                <div 
                  onClick={() => handleCopy(bank.accountNumber, bank.id)}
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800 cursor-pointer group/copy relative"
                >
                  <p className="text-xs text-blue-500 uppercase font-bold mb-1">Số tài khoản (Click để sao chép)</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                      {bank.accountNumber}
                    </p>
                    <span className="text-blue-500 opacity-0 group-hover/copy:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </span>
                  </div>

                  {/* Thông báo đã copy */}
                  {copied === bank.id && (
                    <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-sm flex items-center justify-center rounded-xl animate-in fade-in duration-200">
                      <span className="text-white font-bold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Đã sao chép!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* QR Code Placeholder (Trang trí) */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/10 dark:to-white/0 rounded-bl-full pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Note chân trang */}
        <div className="mt-12 text-center text-sm text-slate-500 italic">
          * Nội dung chuyển khoản: <span className="font-bold text-slate-700 dark:text-slate-300">Donate AnyThink</span>
        </div>
      </div>
    </div>
  );
}