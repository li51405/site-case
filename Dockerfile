# ---------- 构建阶段：安装依赖并产出静态文件 ----------
FROM node:20-alpine AS build
WORKDIR /app

# 先复制依赖清单，利用 Docker 层缓存
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# build 脚本内含 vue-tsc --noEmit 类型检查
RUN npm run build

# ---------- 运行阶段：Nginx 托管静态文件 ----------
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
