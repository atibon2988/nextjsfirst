import { supabase } from '../../lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SoftwareDetailClient from './SoftwareDetailClient';

type Props = {
  params: Promise<{ id: string }>
};

// 1. Hàm SEO (Lấy dữ liệu từ Supabase để tạo Metadata)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // id chính là slug (ví dụ: ra-mat-galaxy-s25)
  
  const { data: item } = await supabase
    .from('posts')
    .select('title, description, image_url')
    .ilike('id', id)
    .single();
  
  if (!item) return { title: "Không tìm thấy - AnyThink" };

  return {
    title: `${item.title} - AnyThink`,
    description: item.description,
    openGraph: {
      images: [item.image_url], // Dùng image_url từ DB
    },
  };
}

// 2. Hàm Page chính (Kết nối Database)
export default async function Page({ params }: Props) {
  const { id } = await params;

  // Lấy nội dung bài chính
  const { data: item } = await supabase
    .from('posts')
    .select('*')
    .ilike('id', id)
    .single();

  if (!item) notFound();

  // Lấy danh sách 4 bài viết mới nhất (Gợi ý bên phải)
  const { data: recentItems } = await supabase
    .from('posts')
    .select('id, title, category, image_url')
    .neq('id', id)
    .order('created_at', { ascending: false })
    .limit(4);

  // Lấy 5 bài viết cũ hơn cùng danh mục (Phần liên quan bên dưới)
  const { data: relatedOldItems } = await supabase
    .from('posts')
    .select('id, title')
    .eq('category', item.category)
    .neq('id', id)
    .lt('created_at', item.created_at)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <SoftwareDetailClient 
      item={item} 
      recentItems={recentItems || []} 
      relatedOldItems={relatedOldItems || []} 
    />
  );
}