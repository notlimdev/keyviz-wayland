import { useEffect, useRef, useState } from "react";
import { listen } from "@tauri-apps/api/event";

// Nombres más legibles para teclas comunes
const KEY_LABELS: Record<string, string> = {
  KEY_LEFTCTRL: "Ctrl",
  KEY_RIGHTCTRL: "Ctrl",
  KEY_LEFTSHIFT: "Shift",
  KEY_RIGHTSHIFT: "Shift",
  KEY_LEFTALT: "Alt",
  KEY_RIGHTALT: "AltGr",
  KEY_LEFTMETA: "Super",
  KEY_RIGHTMETA: "Super",
  KEY_SPACE: "Space",
  KEY_ENTER: "Enter",
  KEY_BACKSPACE: "⌫",
  KEY_TAB: "Tab",
  KEY_ESC: "Esc",
  KEY_DELETE: "Del",
  KEY_HOME: "Home",
  KEY_END: "End",
  KEY_PAGEUP: "PgUp",
  KEY_PAGEDOWN: "PgDn",
  KEY_UP: "↑",
  KEY_DOWN: "↓",
  KEY_LEFT: "←",
  KEY_RIGHT: "→",
  KEY_CAPSLOCK: "Caps",
};

function formatLabel(raw: string): string {
  if (KEY_LABELS[raw]) return KEY_LABELS[raw];
  // KEY_A → "A", KEY_F1 → "F1", KEY_1 → "1"
  const match = raw.match(/^KEY_(.+)$/);
  if (match) return match[1].length === 1 ? match[1].toUpperCase() : match[1];
  return raw;
}

interface KeyEntry {
  id: number;
  label: string;
}

let nextId = 0;
const MAX_KEYS = 6;
const CLEAR_DELAY_MS = 2500;

export default function KeyOverlay() {
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetClearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setKeys([]);
    }, CLEAR_DELAY_MS);
  };

  useEffect(() => {
    const unlisten = listen<string>("key-event", (event) => {
      const label = formatLabel(event.payload);
      setKeys((prev) => {
        const updated = [...prev, { id: nextId++, label }];
        return updated.slice(-MAX_KEYS);
      });
      resetClearTimer();
    });

    return () => {
      unlisten.then((f) => f());
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div data-tauri-drag-region style={styles.wrapper}>
      {keys.map((k) => (
        <span key={k.id} style={styles.chip}>
          {k.label}
        </span>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    width: "100%",
    height: "100%",
    cursor: "move",
    // Fondo semitransparente oscuro — visible sobre cualquier fondo
    background: "rgba(18, 18, 22, 0.82)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "14px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxSizing: "border-box",
    animation: "fadeIn 0.15s ease",
  },
  chip: {
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
  },
};
