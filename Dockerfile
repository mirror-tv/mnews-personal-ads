# 使用 Node.js 18 LTS Alpine 映像作為建置階段的基礎映像
FROM node:18-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 pnpm-lock.yaml 並安裝依賴項
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 複製所有原始碼
COPY . .

# 執行建置命令，產生靜態檔案
RUN pnpm run build

# 使用較小的 Alpine 映像作為最終映像
FROM alpine:latest

# 安裝 serve 套件以提供靜態檔案
RUN apk add --no-cache npm
RUN npm install -g serve

# 設定環境變量，指定應用的埠號
ENV PORT 8080

# 複製建置階段產生的靜態檔案到最終映像
COPY --from=builder /app/dist /app/dist

# 暴露應用程式運行的埠號
EXPOSE 8080

# 定義啟動命令，使用 serve 提供靜態檔案
CMD ["serve", "-s", "/app/dist", "-l", "0.0.0.0:${PORT}"]
