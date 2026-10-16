import type { Metadata } from "next";
import { SiteJsonLd, SoftwareAppJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config";
import { brandConfig } from "@/config/brand";
import {
  CTASection,
  FAQSection,
  FeatureGrid,
  HeroSection,
  HowItWorks,
  UseCasesSection,
} from "@/features/marketing";

/**
 * 生成首页 Metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  const title = isZh
    ? `${siteConfig.name} · 让想法快速启程`
    : `${siteConfig.name} · Build your next chapter`;
  const description = brandConfig.descriptions[isZh ? "zh" : "en"];

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <SiteJsonLd locale={locale as "en" | "zh"} />
      <SoftwareAppJsonLd locale={locale as "en" | "zh"} />

      {/* Page Sections */}
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <UseCasesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
