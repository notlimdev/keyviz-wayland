import type { CSSProperties } from "react";

interface KeyChipProps {
  label: string;
}

/**
 * Chip visual para una tecla individual.
 * Recibe solo el label ya formateado y se encarga únicamente del render.
 */
export default function KeyChip({ label }: KeyChipProps) {
  return <span style={chipStyle}>{label}</span>;
}

const chipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "40px",
  height: "52px",
  padding: "0 14px",
  background: "rgba(255, 255, 255, 0.10)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  borderBottom: "3px solid rgba(255, 255, 255, 0.25)",
  borderRadius: "10px",
  color: "#FFFFFF",
  fontSize: "1.1rem",
  fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
  fontWeight: 600,
  letterSpacing: "0.03em",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  animation: "chipIn 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)",
  whiteSpace: "nowrap",
};
