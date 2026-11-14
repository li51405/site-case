# SITE-CASE

[![Deploy to GitHub Pages](https://github.com/li51405/site-case/actions/workflows/deploy.yml/badge.svg)](https://github.com/li51405/site-case/actions/workflows/deploy.yml)
[![GitHub stars](https://img.shields.io/github/stars/li51405/site-case?style=social)](https://github.com/li51405/site-case/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/li51405/site-case?style=social)](https://github.com/li51405/site-case/network)
[![GitHub issues](https://img.shields.io/github/issues/li51405/site-case)](https://github.com/li51405/site-case/issues)
[![Last Commit](https://img.shields.io/github/last-commit/li51405/site-case)](https://github.com/li51405/site-case/commits)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)

面向企业级客户的营销官网：首屏动效编排、滚动叙事、案例展示与咨询表单，构建产物为纯静态文件，可托管在任意静态服务器 / CDN / 容器上。

## 技术栈

| 类别 | 选型 | 说明 |
|---|---|---|
| 框架 | Vue 3.5（Composition API + `<script setup>`） | 全站 TypeScript，`strict` 模式 |
| 构建 | Vite 6 + @vitejs/plugin-vue | `vue-tsc --noEmit` 纳入构建流程 |
| 样式 | UnoCSS（presetWind3） | 原子化工具类 + shortcuts 体系；动画/纹理在手写 `main.css` |
| 路由 | Vue Router 4（history 模式） | 路由懒加载；`meta` 承载各页 SEO 文案 |
| 状态 | Pinia | `ui`（导航/滚动）、`inquiry`（咨询表单草稿与提交） |
| 国际化 | vue-i18n 11 | 单语言（zh-CN）；文案统一收敛于 `src/copy/`，预留多语言扩展 |

无 UI 组件库依赖，全部组件手写；零运行时动画依赖，动效由 CSS keyframes + `v-reveal` 指令（IntersectionObserver）+ rAF 实现。

## 项目结构

```
├── index.html              # 入口模板（SEO 占位符由构建期从 src/copy 注入）
├── .github/workflows/      # GitHub Pages 自动部署流水线
├── vite.config.ts          # Vite 配置（@ 别名 + SEO 注入插件）
├── uno.config.ts           # UnoCSS 主题（色彩/阴影/shortcuts）
├── nginx.conf              # SPA 站点配置（容器与常规部署共用）
├── Dockerfile              # 多阶段构建：Node 构建 → Nginx 托管
└── src/
    ├── main.ts             # 应用入口（Pinia / i18n / Router / v-reveal）
    ├── App.vue             # 布局壳 + 路由过渡（page transition）
    ├── copy/               # ★ 全站文案统一出口（'@/copy'）
    │   ├── index.ts        #   createI18n 实例 + copy 强类型文案树
    │   └── zh-CN/          #   按模块分文件（brand/home/services/cases/technology/contact/routes/common）
    ├── router/             # 路由表（meta 挂 SEO 文案）
    ├── stores/             # Pinia：ui / inquiry
    ├── directives/         # v-reveal 滚动入场指令
    ├── styles/             # main.css（变量/动画/纹理/路由过渡）
    ├── components/
    │   ├── layout/         # AppHeader / AppFooter / PageHero
    │   ├── home/           # 首页八个区块组件
    │   ├── ui/             # Icon / SectionHeading / StatCounter
    │   └── graphics/       # ConsoleMock / NetworkGraph 示意图
    └── views/              # 六个路由页面（Home/Services/Cases/CaseDetail/Technology/Contact/NotFound）
```

## 项目运行周期

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（http://localhost:5173，热更新）
npm run dev

# 3. 类型检查（vue-tsc，构建前也可单独运行）
npm run typecheck

# 4. 生产构建（类型检查 + 产物输出到 dist/）
npm run build

# 5. 本地预览构建产物
npm run preview
```

开发期调试提示：URL 追加 `?noreveal=1` 可关闭全部入场动画与平滑滚动，便于截图 / E2E 测试。

### 文案维护

全站用户可见文案集中在 `src/copy/zh-CN/` 下按模块维护，组件统一 `import { copy } from '@/copy'` 取用；带插值的句子用 `t()`（如 `t('contact.success.title', { name })`）。修改文案无需触碰任何组件。

## 容器化部署

项目根目录提供 `Dockerfile`（多阶段构建）与 `nginx.conf`（SPA 路由回退 + 静态资源缓存策略）。注意容器/常规部署使用根路径，无需设置 `BASE_PATH`：

```bash
# 构建镜像
docker build -t site-case .

# 运行（映射到宿主机 8080 端口）
docker run -d -p 8080:80 --name site-case site-case
```

访问 `http://<主机>:8080` 即可。镜像内已包含类型检查，构建失败即部署失败，不会带病上线。

如需跟随系统启动，可用 compose：

```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## 常规部署

构建产物为 `dist/` 下的纯静态文件，可直接部署到任意静态服务器或对象存储 CDN（OSS / COS / S3 + CloudFront 等）。唯一要求：**必须为 SPA 配置 history 路由回退**（所有未知路径返回 `index.html`），否则刷新非根路径（如 `/cases`）会 404。

Nginx 参考配置（与仓库内 `nginx.conf` 一致，按需调整 `server_name` 与证书）：

```nginx
server {
  listen 80;
  server_name www.example.com;

  root /var/www/site-case;   # 指向 dist/ 内容
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;   # SPA 路由回退，必需
  }

  location /assets/ {                   # 带哈希的静态资源长缓存
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location = /index.html {              # 入口页不缓存，发版即生效
    add_header Cache-Control "no-cache";
  }

  gzip on;
  gzip_types text/css application/javascript application/json image/svg+xml;
}
```

发版流程：`npm run build` → 将 `dist/` 内容同步到站点根目录（`scp` / `rsync` / CI 流水线均可），无需重启服务。

## GitHub Pages 部署

仓库已内置自动部署流水线（`.github/workflows/deploy.yml`）：

1. 将仓库推送到 GitHub（仓库需命名为 `site-case`）；
2. 在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**；
3. 之后每次推送到 `main` 分支即自动构建发布，站点地址为 `https://<用户名>.github.io/site-case/`。

流水线做了两件关键事情：

- **子路径基座**：项目站点部署在 `/site-case/` 下，`build:pages` 通过 `vite build --base=/site-case/` 设置资源基路径，Vue Router 侧由 `createWebHistory(import.meta.env.BASE_URL)` 自动对齐；
- **SPA 回退**：GitHub Pages 不支持服务端路由回退，流水线将 `index.html` 复制为 `404.html`，使直达或刷新子路径（如 `/site-case/cases`）时也能正常加载应用。

手动构建 Pages 产物（不走 CI 时）：

```bash
npm run build:pages                # 等价于 vite build --base=/site-case/（含类型检查）
cp dist/index.html dist/404.html   # Windows PowerShell: copy dist/index.html dist/404.html
# 将 dist/ 推送到 gh-pages 分支或上传任意 Pages 通道
```

若使用自定义域名（`CNAME`）部署到根路径，`BASE_PATH` 保持默认 `/` 即可。
