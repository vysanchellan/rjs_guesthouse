import type { Metadata } from "next";
import * as Icons from "@/components/icons";

/** Internal reference sheet for checking the icon set holds up at size. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

const entries = Object.entries(Icons).filter(([k]) => k[0] === k[0].toUpperCase());

export default function IconSheet() {
  return (
    <main style={{ padding: 40, background: "#0e1e21", minHeight: "100vh" }}>
      {[21, 44].map((size) => (
        <div key={size} style={{ display: "flex", flexWrap: "wrap", gap: 28, marginBottom: 48 }}>
          {entries.map(([name, Icon]) => (
            <div key={name} style={{ width: 96, textAlign: "center", color: "#d8a459" }}>
              <Icon size={size} />
              <div style={{ color: "#ab9f8b", fontSize: 10, marginTop: 6 }}>{name}</div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
