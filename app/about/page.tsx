import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Câu chuyện về AnyThink và sứ mệnh chia sẻ tri thức miễn phí.',
};
export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* --- HEADER (Giống trang chủ để đồng bộ) --- */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Kho Phần Mềm
          </Link>
          <nav className="space-x-4 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="text-blue-600">Giới thiệu</span>
          </nav>
        </div>
      </header>

      {/* --- NỘI DUNG CHÍNH --- */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Về Website Này
          </h1>

          <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            <p>
              Chào mừng bạn đến với <strong>Kho Phần Mềm</strong>. Đây là nơi mình lưu trữ và chia sẻ những công cụ, phần mềm hữu ích mà mình đã kiểm tra kỹ lưỡng trong quá trình làm việc và học tập.
            </p>

            <h3 className="text-xl font-bold text-gray-800">Mục đích</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Lưu trữ các phiên bản phần mềm ổn định, hoạt động tốt trên Android & PC.</li>
              <li>Chia sẻ kinh nghiệm cài đặt và tối ưu hóa hệ thống.</li>
              <li>Tạo cộng đồng cùng nhau học lập trình và vọc vạch công nghệ.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800">Tuyên bố miễn trừ trách nhiệm</h3>
            <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-sm">
              Các phần mềm được chia sẻ tại đây chủ yếu phục vụ mục đích học tập và nghiên cứu. Mình không chịu trách nhiệm về bản quyền hoặc các vấn đề phát sinh khi sử dụng. Hãy ủng hộ tác giả gốc nếu có thể.
            </p>

            <h3 className="text-xl font-bold text-gray-800">Liên hệ</h3>
            <p>
              Nếu bạn có thắc mắc hoặc muốn đóng góp phần mềm, đừng ngần ngại liên hệ với mình qua:
            </p>
            <div className="flex gap-4 mt-4">
               <a href="https://github.com" target="_blank" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                 GitHub
               </a>
               <a href="mailto:email@example.com" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                 Gửi Email
               </a>
            </div>
          </div>

          {/* Nút quay về */}
          <div className="mt-10 border-t pt-6 text-center">
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              &larr; Quay lại trang chủ
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}