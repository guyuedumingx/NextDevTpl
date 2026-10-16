"use client";

import { ArrowRight, ArrowUpRight, Blocks, Check, Layers3 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { brandConfig } from "@/config/brand";
import { Link } from "@/i18n/routing";

export function HeroSection() {
  const t = useTranslations("Hero");
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="aura pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
      />
      <div className="container grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">{t("title1")}</span>
            <span className="mt-2 block text-primary">
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                {t("getStarted")}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                {t("seeDemo")}
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-sm text-muted-foreground">
            {["modular", "extendable", "owned"].map((key) => (
              <span key={key} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {t(`principles.${key}`)}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden
            className="absolute -inset-5 rotate-3 rounded-3xl border border-primary/10 bg-primary/[0.03]"
          />
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lifted">
            <div className="flex items-center justify-between border-b px-6 py-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
              <span>QUICKSTARTER / YOUR NEXT CHAPTER</span>
              <Blocks className="h-4 w-4" />
            </div>
            <div className="relative flex min-h-72 flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 p-10 sm:min-h-80">
              <div
                aria-hidden
                className="absolute inset-8 rounded-full border border-primary/10"
              />
              <div
                aria-hidden
                className="absolute inset-16 rounded-full border border-primary/10"
              />
              <Image
                src={brandConfig.mark}
                width={146}
                height={146}
                alt={`${brandConfig.name} brand mark`}
                className="relative rounded-3xl bg-white p-5 shadow-soft"
                priority
                unoptimized
              />
              <p className="relative text-2xl font-bold tracking-tight">
                {brandConfig.name}
              </p>
              <p className="relative text-xs tracking-[0.25em] text-muted-foreground">
                BUILD. LAUNCH. GROW.
              </p>
            </div>
            <div className="grid grid-cols-3 divide-x border-t">
              {["accounts", "credits", "workspace"].map((key) => (
                <div key={key} className="px-3 py-5 text-center">
                  <Layers3 className="mx-auto mb-2 h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">
                    {t(`foundation.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
