# Bước 1: Build giai đoạn cài đặt
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Khai báo nhận đối số
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
# Chuyển đối số thành biến môi trường lúc build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
RUN npm run build

# Bước 2: Giai đoạn chạy (Runner) để giảm dung lượng ảnh
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Khai báo nhận đối số
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
# Chuyển đối số thành biến môi trường lúc build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

EXPOSE 3000
CMD ["npm", "run", "start"]
