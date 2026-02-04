#!/bin/bash
# Lấy ngày giờ hiện tại làm Tag (Ví dụ: 20260204-1620)
TAG=$(date +%Y%m%d-%H%M)
REPO="atibon2988/anythink"

echo "🚀 Đang build bản: $TAG"



docker build   --build-arg NEXT_PUBLIC_SUPABASE_URL=https://nnprtjbfkjvmrvtovjfg.supabase.co   --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7vtEyOuPVT9l8NZntiW3iw_KFHJLYu0   -t $REPO:$TAG -t $REPO:lastest .

echo "☁️ Đang đẩy lên Docker Hub..."
docker push $REPO:$TAG
docker push $REPO:latest

echo "✅ Đã xong! Bản mới nhất là $TAG"
