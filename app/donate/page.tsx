// app/donate/page.tsx
import type { Metadata } from 'next';
import DonateClient from './DonateClient'; // Import component client vừa tạo

export const metadata: Metadata = {
  title: 'Ủng hộ dự án',
  description: 'Chung tay đóng góp duy trì máy chủ cho AnyThink.',
};

export default function DonatePage() {
  return <DonateClient />;
}