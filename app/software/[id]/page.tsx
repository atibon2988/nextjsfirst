import { allItems } from '../../data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SoftwareDetailClient from './SoftwareDetailClient';

type Props = {
  params: Promise<{ id: string }>
};

// 1. Hàm SEO (Chạy ở Server)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = allItems.find((i) => i.id === id);
  
  if (!item) return { title: "Không tìm thấy - AnyThink" };

  return {
    title: `${item.title} - AnyThink`,
    description: item.description,
    openGraph: {
      images: [item.imageUrl],
    },
  };
}

// 2. Hàm Page chính (Phải có export default)
export default async function Page({ params }: Props) {
  const { id } = await params;
  const item = allItems.find((p) => p.id === id);

  if (!item) notFound();

  // Chuẩn bị dữ liệu để truyền xuống Client
  const recentItems = allItems
    .filter(i => i.id !== id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const relatedOldItems = allItems
    .filter(i => i.category === item.category && i.id !== id && new Date(i.date) < new Date(item.date))
    .slice(0, 5);

  return (
    <SoftwareDetailClient 
      item={item} 
      recentItems={recentItems} 
      relatedOldItems={relatedOldItems} 
    />
  );
}