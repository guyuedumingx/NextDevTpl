import { ImageResponse } from "next/og";
import { siteConfig } from "@/config";
import { brandConfig } from "@/config/brand";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function createOgImageResponse(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#f7f8f4",
        color: "#123c35",
        border: "16px solid #00594f",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders native image elements, not next/image. */}
        <img
          src={new URL(brandConfig.mark, siteConfig.url).toString()}
          width="96"
          height="96"
          alt=""
        />
        <span style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>
          {brandConfig.name}
        </span>
      </div>
      <div style={{ display: "flex", marginTop: 44, fontSize: 40 }}>
        Build your next chapter.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          maxWidth: 850,
          fontSize: 24,
          lineHeight: 1.5,
          color: "#526860",
        }}
      >
        {brandConfig.descriptions.en}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 42,
          fontSize: 16,
          letterSpacing: 5,
        }}
      >
        BUILD. LAUNCH. GROW.
      </div>
    </div>,
    OG_IMAGE_SIZE
  );
}
