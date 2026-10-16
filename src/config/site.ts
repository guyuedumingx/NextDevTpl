import { brandConfig } from "./brand";

/** 未配置的公开外链不展示。 */
export const siteConfig = {
  name: brandConfig.name,
  description: brandConfig.descriptions.en,
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/en/opengraph-image",
  author: {
    name: brandConfig.team,
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
  },
  links: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || "",
  },
  keywords: ["QuickStarter", "SaaS", "AI tools", "creative tools"],
} as const;

export type SiteConfig = typeof siteConfig;
