import type { Metadata } from 'next';
import FeedbackClient from './FeedbackClient'; // Import component client vừa tạo

export const metadata: Metadata = {
  title: 'Góp ý & Báo lỗi', // Tab sẽ hiện: "Góp ý & Báo lỗi | AnyThink"
  description: 'Gửi đóng góp ý kiến để xây dựng cộng đồng AnyThink tốt hơn.',
};



export default function FeedbackPage() {
  return <FeedbackClient />;
}