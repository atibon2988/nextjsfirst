"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Lỗi đăng nhập: " + error.message);
    } else {
      router.push("/admin"); // Đăng nhập xong vào thẳng Admin
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Email" className="w-full p-3 rounded-xl border dark:bg-slate-800 outline-none focus:border-blue-500"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input 
            type="password" placeholder="Mật khẩu" className="w-full p-3 rounded-xl border dark:bg-slate-800 outline-none focus:border-blue-500"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <button 
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Đang kiểm tra..." : "ĐĂNG NHẬP"}
          </button>
        </div>
      </form>
    </div>
  );
}