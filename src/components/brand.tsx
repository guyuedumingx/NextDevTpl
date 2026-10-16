import Image from "next/image";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

/** 页面共用的品牌标识。 */
export function Brand({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
        <Image
          src={brandConfig.mark}
          width={30}
          height={30}
          alt={brandConfig.name}
          unoptimized
        />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight">
          {brandConfig.name}
        </span>
      )}
    </span>
  );
}
