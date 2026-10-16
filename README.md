# QuickStarter

<img src="public/brand/quickstarter-mark.png" alt="QuickStarter" width="88" />

我们自己的产品开发底座，基于开源基础持续二次开发。账户、积分、工作台和后台保留为通用能力；具体业务通过独立模块与供应商适配器扩展。

## 本地运行

需要 Node.js 24 和 pnpm 10.21.0。

```sh
pnpm install --frozen-lockfile
# 首次启动时复制 .env.example 为 .env.local，配置本地或测试 PostgreSQL 及认证密钥。
pnpm db:migrate
pnpm dev --hostname 127.0.0.1
```

当前工作区已配置独立的本地开发库与测试库，配置文件不会提交到 Git。

## 品牌与开发入口

| 内容 | 入口 |
| --- | --- |
| 名称、描述、Logo 路径 | `src/config/brand.ts` |
| 域名、可选联系方式与社交链接 | `src/config/site.ts` |
| 全站品牌组件 | `src/components/brand.tsx` |
| 中英文文案 | `messages/en.json`、`messages/zh.json` |
| 业务模块 | `src/features/` |
| 服务契约与供应商实现 | `src/core/services/`、`src/adapters/`、`src/services/` |
| 博客与开发文档 | `src/content/` |
| AI 图片／视频业务规划 | `docs/AI_MEDIA_ARCHITECTURE.md` |

Logo 由图像生成工具制作，使用深绿色 Q 形与启程箭头，网站使用透明 PNG 与独立 favicon。生成提示词见 `docs/BRAND.md`。

## 当前状态

本地邮箱登录、账户设置、积分账本与管理员页面可运行。图片／视频生成和 Waffo 尚未接入，也尚未部署 Cloudflare。现有支付代码保留供扩展，公开首页不展示未启用的付费套餐或虚构客户评价。

Cloudflare 上线时应选择 Workers 兼容的模块和适配器组合，分别验证构建、数据库事务、回调与异步任务。

## 验证

```sh
pnpm lint
pnpm typecheck
pnpm build
# .env.test 必须指向独立的测试数据库。
pnpm test:run
```

## 开源基础

保留原始 MIT 许可证，详见 `LICENSE` 和 `NOTICE.md`。上游生成器的技术标识 `create-nextdevtpl` 与 `nextdevtpl.generated.json` 保持兼容；它们不用于面向用户的品牌展示。
