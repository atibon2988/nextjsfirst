// app/data.ts

export const allItems = [
  // =========================================
  // 1. MỤC TIN TỨC (5 BÀI)
  // =========================================
  {
    id: 101,
    title: "Ra mắt Galaxy S25 Ultra: AI đỉnh cao",
    imageUrl: "https://images.unsplash.com/photo-1610945265078-38584e12e4c6?q=80&w=800&auto=format&fit=crop",
    description: "Samsung chính thức công bố siêu phẩm mới với chip Snapdragon 8 Gen 5.",
    category: "Tin tức",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: "Samsung vừa chính thức ra mắt Galaxy S25 Ultra..."
  },
  {
    id: 102,
    title: "Windows 12 lộ diện giao diện mới",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    description: "Microsoft thay đổi hoàn toàn thanh Taskbar, tích hợp sâu Copilot.",
    category: "Tin tức",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: "Giao diện Windows 12 sẽ có thiết kế nổi..."
  },
  {
    id: 103,
    title: "Giá Bitcoin vượt mốc 100k USD",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    description: "Thị trường tiền điện tử bùng nổ trở lại sau đợt Halving.",
    category: "Tin tức",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: `
      Sáng nay, Bitcoin đã chính thức phá vỡ mọi kỷ lục lịch sử để chạm mốc 100.000 USD. 
      Các chuyên gia tài chính nhận định đây là kết quả của việc các quỹ ETF Bitcoin được thông qua rộng rãi trên toàn cầu.
    `
  },
  {
    id: 104,
    title: "Công nghệ pin hạt nhân cho điện thoại",
    imageUrl: "https://images.unsplash.com/photo-1569992923588-4447ad9527f4?w=800&q=80",
    description: "Pin dùng 50 năm không cần sạc đang được Trung Quốc thử nghiệm.",
    category: "Tin tức",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: `
      Một công ty công nghệ tại Bắc Kinh tuyên bố đã chế tạo thành công pin hạt nhân kích thước nhỏ bằng đồng xu.
      Viên pin này có thể cung cấp năng lượng liên tục trong 50 năm mà không cần sạc lại, hứa hẹn thay đổi hoàn toàn ngành công nghiệp smartphone và drone.
    `
  },
  {
    id: 105,
    title: "Google ra mắt Gemini 2.0 Ultra",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    description: "Mô hình AI mới thông minh gấp đôi GPT-5.",
    category: "Tin tức",
    date: "2024-01-22",
    downloadUrl: "#",
    detailContent: `
      Google vừa tung ra Gemini 2.0 Ultra với khả năng xử lý đa phương thức (hình ảnh, âm thanh, video) theo thời gian thực với độ trễ gần như bằng 0.
      Các lập trình viên có thể trải nghiệm API miễn phí bắt đầu từ hôm nay.
    `
  },

  // =========================================
  // 2. MỤC GAME (8 BÀI)
  // =========================================
  {
    id: 201,
    title: "Genshin Impact (Lite Version)",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    description: "Bản giảm dung lượng siêu nhẹ cho máy cấu hình thấp.",
    category: "Game",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: `
      Đây là phiên bản Genshin Impact đã được nén texture và giảm hiệu ứng để chạy mượt trên các máy Ram 3GB/4GB.
      
      **Hướng dẫn cài đặt:**
      1. Tải file APK và OBB bên dưới.
      2. Giải nén OBB vào thư mục /Android/obb/com.mihoyo.genshin.
      3. Cài đặt APK và thưởng thức.
    `
  },
  {
    id: 202,
    title: "PUBG Mobile: Update Tết 2026",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    description: "Chế độ Rồng Thần và skin súng mới cực đẹp.",
    category: "Game",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: `
      Bản cập nhật mừng xuân 2026 mang đến chế độ chơi 'Săn Rồng' cực hấp dẫn.
      Người chơi có thể cưỡi rồng bay lượn trên bản đồ Erangel và nhặt các vật phẩm sự kiện để đổi skin súng M416 Băng Tuyết.
    `
  },
  {
    id: 203,
    title: "Liên Quân Mobile (Mod Skin)",
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    description: "Mở khóa full trang phục SSS, hiệu ứng gốc.",
    category: "Game",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: `
      File Mod skin an toàn, chỉ hiển thị ở phía người chơi (Client side), không can thiệp vào server nên không lo bị khóa nick.
      Bao gồm các skin hot nhất: Nakroth Thứ Nguyên Vệ Thần, Tulen Chí Tôn Kiếm Tiên...
    `
  },
  {
    id: 204,
    title: "Minecraft PE 1.22 Tiếng Việt",
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80",
    description: "Đã mở khóa đăng nhập Xbox Live và Server.",
    category: "Game",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: `
      Phiên bản Minecraft Pocket Edition 1.22 mới nhất cập nhật biome Rừng Mưa Nhiệt Đới.
      File APK này đã được patch để đăng nhập Xbox Live thoải mái, chơi chung với bạn bè trên PC và Console.
    `
  },
  {
    id: 205,
    title: "GTA San Andreas: Remastered",
    imageUrl: "https://images.unsplash.com/photo-1558945622-c3595cb53746?w=800&q=80",
    description: "Đồ họa 4K, Việt hóa 100% cốt truyện.",
    category: "Game",
    date: "2024-01-22",
    downloadUrl: "#",
    detailContent: `
      Huyền thoại CJ đã trở lại với diện mạo mới.
      Mod đồ họa ENB Series giúp ánh sáng chân thực như GTA V.
      Cốt truyện đã được nhóm Gametiengviet dịch thuật chuẩn 100%.
    `
  },
  {
    id: 206,
    title: "Roblox Mod Menu V8",
    imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    description: "Hack bay, đi xuyên tường, tự động farm Blox Fruit.",
    category: "Game",
    date: "2024-01-21",
    downloadUrl: "#",
    detailContent: `
      Menu Mod dành cho các pháp sư Roblox.
      Tính năng: 
      - Auto Farm Level
      - Auto Raid
      - Esp Player (Nhìn xuyên vật thể)
      Lưu ý: Sử dụng tài khoản phụ để trải nghiệm trước.
    `
  },
  {
    id: 207,
    title: "Play Together VNG",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    description: "Tool hỗ trợ câu cá hiếm, lọc bóng 5.",
    category: "Game",
    date: "2024-01-20",
    downloadUrl: "#",
    detailContent: `
      Tool hỗ trợ game thủ Play Together tự động giật cần khi cá cắn câu.
      Có chức năng lọc bóng, chỉ câu cá hiếm và cá vương miện để tiết kiệm độ bền cần câu.
    `
  },
  {
    id: 208,
    title: "Asphalt 9: Legends (Offline)",
    imageUrl: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80",
    description: "Phiên bản mod chơi không cần mạng, full tiền.",
    category: "Game",
    date: "2024-01-19",
    downloadUrl: "#",
    detailContent: `
      Đã mở khóa toàn bộ siêu xe hạng S. 
      Bạn có thể đua thoải mái ở chế độ Career mà không cần kết nối internet.
      Nitro vô hạn giúp bạn luôn dẫn đầu đường đua.
    `
  },

  // =========================================
  // 3. MỤC VIDEO (6 BÀI)
  // =========================================
  {
    id: 301,
    title: "Học Lập Trình ReactJS trong 1 Giờ",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    description: "Khóa học cấp tốc cho người mới bắt đầu.",
    category: "Video",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: `
      Video này sẽ tóm tắt toàn bộ kiến thức cốt lõi của ReactJS: Component, State, Props và useEffect.
      Cuối video chúng ta sẽ cùng nhau làm một trang web Todo List đơn giản.
    `
  },
  {
    id: 302,
    title: "Review iPhone 16 Pro Max",
    imageUrl: "https://images.unsplash.com/photo-1512054502232-120fea5a3181?w=800&q=80",
    description: "Có đáng nâng cấp từ iPhone 15?",
    category: "Video",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: `
      Đánh giá chi tiết sau 1 tháng sử dụng iPhone 16 Pro Max.
      Test hiệu năng chơi game Genshin Impact max setting.
      Test camera chụp đêm và quay video Cinematic 8K.
    `
  },
  {
    id: 303,
    title: "Setup Góc Làm Việc Dev 2026",
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80",
    description: "Tham quan bàn làm việc lập trình viên Fullstack.",
    category: "Video",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: `
      Chia sẻ các món đồ công nghệ mình đang dùng:
      - Macbook Pro M4
      - Màn hình LG 34 inch Ultrawide
      - Bàn phím cơ Keychron Q1 Pro
      - Đèn màn hình Screenbar
    `
  },
  {
    id: 304,
    title: "Cài Linux lên điện thoại Android",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    description: "Biến điện thoại thành máy chủ mini.",
    category: "Video",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: `
      Hướng dẫn sử dụng Termux và Andronix để cài Ubuntu giao diện đồ họa lên điện thoại.
      Chạy VS Code và trình duyệt Chromium ngay trên màn hình điện thoại.
    `
  },
  {
    id: 305,
    title: "Nhạc Lofi Chill Học Bài",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&q=80",
    description: "Tổng hợp 2 giờ nhạc không lời thư giãn.",
    category: "Video",
    date: "2024-01-22",
    downloadUrl: "#",
    detailContent: `
      Video tổng hợp các bản nhạc Lofi Hip Hop beats to relax/study to.
      Giúp tăng khả năng tập trung khi làm việc và học tập.
    `
  },
  {
    id: 306,
    title: "Mẹo Tối Ưu Windows 11",
    imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
    description: "Tắt các service thừa để máy chạy nhanh như gió.",
    category: "Video",
    date: "2024-01-21",
    downloadUrl: "#",
    detailContent: `
      Hướng dẫn gỡ bỏ Bloatware (phần mềm rác) cài sẵn trên Windows 11.
      Tắt các hiệu ứng đồ họa không cần thiết để giải phóng RAM và CPU.
    `
  },

  // =========================================
  // 4. MỤC ẢNH (7 BÀI)
  // =========================================
  {
    id: 401,
    title: "Bộ sưu tập Wallpaper Cyberpunk",
    imageUrl: "https://images.unsplash.com/photo-1535378437327-10886151021c?w=800&q=80",
    description: "Hình nền 4K chủ đề tương lai neon rực rỡ.",
    category: "Ảnh",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: "Link Google Drive tải trọn bộ 50 tấm ảnh chất lượng gốc (PNG)."
  },
  {
    id: 402,
    title: "Ảnh Phong Cảnh Thiên Nhiên",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    description: "Những ngọn núi và dòng sông hùng vĩ.",
    category: "Ảnh",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: "Bộ ảnh chụp từ các nhiếp ảnh gia National Geographic. Thích hợp làm hình nền máy tính."
  },
  {
    id: 403,
    title: "Anime Girls Pack 4K",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
    description: "Hình nền nhân vật nữ Anime dễ thương.",
    category: "Ảnh",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: "Tổng hợp các Waifu từ Genshin, Honkai và các bộ Anime nổi tiếng mùa này."
  },
  {
    id: 404,
    title: "Minimalist Dark Mode",
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
    description: "Hình nền tối giản, bảo vệ mắt cho màn hình OLED.",
    category: "Ảnh",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: "Những tấm ảnh chủ đạo màu đen, điểm xuyết vài chi tiết nhỏ tinh tế."
  },
  {
    id: 405,
    title: "Siêu Xe & Tốc Độ",
    imageUrl: "https://images.unsplash.com/photo-1503376763036-066120622c74?w=800&q=80",
    description: "Lamborghini, Ferrari, Bugatti độ phân giải 8K.",
    category: "Ảnh",
    date: "2024-01-22",
    downloadUrl: "#",
    detailContent: "Dành cho những đam mê tốc độ. Ảnh sắc nét đến từng con ốc."
  },
  {
    id: 406,
    title: "Vũ Trụ Bao La",
    imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    description: "Ảnh chụp từ kính viễn vọng James Webb.",
    category: "Ảnh",
    date: "2024-01-21",
    downloadUrl: "#",
    detailContent: "Khám phá vẻ đẹp của các tinh vân và thiên hà cách chúng ta hàng triệu năm ánh sáng."
  },
  {
    id: 407,
    title: "Cảm Hứng Coding",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    description: "Hình nền các dòng code và setup máy tính.",
    category: "Ảnh",
    date: "2024-01-20",
    downloadUrl: "#",
    detailContent: "Tạo động lực lập trình mỗi ngày với bộ hình nền Tech cực chất."
  },

  // =========================================
  // 5. MỤC PHẦN MỀM (5 BÀI)
  // =========================================
  {
    id: 501,
    title: "VS Code for Android",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    description: "Trình soạn thảo code chuyên nghiệp nhất trên điện thoại.",
    category: "Phần mềm",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: `
      Phiên bản Code Server chạy trên nền trình duyệt.
      Hỗ trợ cài Extension, Terminal, Git đầy đủ như trên máy tính.
      Yêu cầu cài đặt Termux trước khi sử dụng.
    `
  },
  {
    id: 502,
    title: "Termux Premium",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    description: "Giả lập dòng lệnh Linux mạnh mẽ.",
    category: "Phần mềm",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: `
      Công cụ không thể thiếu cho các vọc sĩ Android.
      Phiên bản này đã sửa lỗi kho lưu trữ (Repo) và cài sẵn các gói python, nodejs cơ bản.
    `
  },
  {
    id: 503,
    title: "Adobe Photoshop Touch",
    imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
    description: "Huyền thoại chỉnh ảnh layer trên Mobile.",
    category: "Phần mềm",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: `
      Mặc dù đã bị Adobe khai tử nhưng PS Touch vẫn là app chỉnh ảnh mạnh nhất với khả năng xử lý Layer chuyên nghiệp.
      Bản này đã được mod để chạy tốt trên Android 14/15.
    `
  },
  {
    id: 504,
    title: "IDM+ Mobile Downloader",
    imageUrl: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&q=80",
    description: "Tăng tốc tải file gấp 500%.",
    category: "Phần mềm",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: `
      Trình quản lý tải xuống tốt nhất Android.
      Hỗ trợ bắt link video, torrent và tự động nối file bị lỗi mạng.
      Phiên bản Plus đã xóa quảng cáo.
    `
  },
  {
    id: 505,
    title: "Es File Explorer Pro",
    imageUrl: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&q=80",
    description: "Quản lý file hệ thống, giải nén ZIP/RAR.",
    category: "Phần mềm",
    date: "2024-01-22",
    downloadUrl: "#",
    detailContent: `
      Trình quản lý tệp tin huyền thoại.
      Giao diện Pro màu đen sang trọng.
      Hỗ trợ kết nối FTP, LAN, Google Drive để chuyển file không dây.
    `
  },

  // =========================================
  // 6. MỤC NHẠC (4 BÀI)
  // =========================================
  {
    id: 601,
    title: "Tuyển Tập Sơn Tùng M-TP",
    imageUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80",
    description: "Những bản hit đình đám nhất sự nghiệp.",
    category: "Nhạc",
    date: "2024-01-26",
    downloadUrl: "#",
    detailContent: "Playlist bao gồm: Chúng ta của tương lai, Lạc Trôi, Em của ngày hôm qua... chất lượng Lossless (FLAC)."
  },
  {
    id: 602,
    title: "Nhạc Không Lời Coding Focus",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    description: "Nhạc sóng não Alpha giúp tập trung cao độ.",
    category: "Nhạc",
    date: "2024-01-25",
    downloadUrl: "#",
    detailContent: "Tuyển tập những bản nhạc Piano và Electronic nhẹ nhàng, loại bỏ tạp âm để bạn Code không ngừng nghỉ."
  },
  {
    id: 603,
    title: "Remix TikTok 2026 Cực Căng",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    description: "Nhạc quẩy Vinahouse bass đập tức ngực.",
    category: "Nhạc",
    date: "2024-01-24",
    downloadUrl: "#",
    detailContent: "Tổng hợp các trend nhạc hot nhất TikTok tháng này. Thích hợp để bật trong các buổi Party."
  },
  {
    id: 604,
    title: "Nhạc Thiền - Dễ Ngủ",
    imageUrl: "https://images.unsplash.com/photo-1515023663285-11ad160cc1cf?w=800&q=80",
    description: "Âm thanh mưa rơi và tiếng suối chảy.",
    category: "Nhạc",
    date: "2024-01-23",
    downloadUrl: "#",
    detailContent: "Giúp thư giãn thần kinh, giảm stress sau một ngày làm việc căng thẳng. Đeo tai nghe để trải nghiệm âm thanh 8D."
  },
];