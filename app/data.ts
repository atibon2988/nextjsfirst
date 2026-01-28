// File: app/data.ts
export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  views: number;
  downloadUrl?: string;
}

export const allItems: Item[] = [
  {
    id: '1',
    title: 'Visual Studio Code',
    description: 'Trình biên tập code tốt nhất của Microsoft.',
    category: 'Phần mềm',
    imageUrl: 'https://picsum.photos/seed/vscode/800/450',
    date: '28/01/2026',
    views: 1502,
    downloadUrl: 'https://code.visualstudio.com/'
  },
  {
    id: '2',
    title: 'Elden Ring: Shadow of the Erdtree',
    description: 'Bản mở rộng DLC hấp dẫn nhất năm.',
    category: 'Game',
    imageUrl: 'https://picsum.photos/seed/elden/800/450',
    date: '25/01/2026',
    views: 3400
  },
  {
    id: '3',
    title: 'Adobe Photoshop 2026',
    description: 'Phần mềm chỉnh sửa ảnh chuyên nghiệp tích hợp AI.',
    category: 'Phần mềm',
    imageUrl: 'https://picsum.photos/seed/photoshop/800/450',
    date: '20/01/2026',
    views: 8900
  },
  {
    id: '4',
    title: 'Review iPhone 16 Pro Max',
    description: 'Đánh giá chi tiết hiệu năng và camera.',
    category: 'Video',
    imageUrl: 'https://picsum.photos/seed/iphone/800/450',
    date: '22/01/2026',
    views: 560
  }
];