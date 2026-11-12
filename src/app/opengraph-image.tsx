import { ImageResponse } from "next/og";

export const alt = "BAS Expert — автоматизація бізнесу, ШІ-агенти та інтеграції";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#0b1220", color: "white", padding: "70px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "90px", height: "90px", background: "#0369a1", borderRadius: "22px", fontSize: 40, fontWeight: 700 }}>BE</div>
        <div style={{ fontSize: 64, fontWeight: 700 }}>BAS Expert</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: 62, fontWeight: 700 }}>Business automation</div>
        <div style={{ fontSize: 38, color: "#7dd3fc" }}>BAS · AI agents · Integrations</div>
      </div>
      <div style={{ width: "100%", height: "4px", background: "#0369a1" }} />
    </div>, size,
  );
}
