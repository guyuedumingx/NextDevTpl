# QuickStarter

Our product foundation, extended from open-source software. Brand settings live in `src/config/brand.ts`, and public URLs and optional contacts live in `src/config/site.ts`.

Use Node.js 24 and pnpm 10.21.0. Install with `pnpm install --frozen-lockfile`, configure a local PostgreSQL database and auth settings in `.env.local`, run `pnpm db:migrate`, then `pnpm dev`.

Accounts, credits and administration work locally. Media generation and Waffo are not connected. Cloudflare deployment remains a separate integration and verification step.

See `README.md`, `docs/AI_MEDIA_ARCHITECTURE.md`, `docs/BRAND.md`, and `AGENTS.md` for ongoing development. Preserve the MIT license and upstream generator identifiers. Attribution is retained in `NOTICE.md` and `LICENSE`.
