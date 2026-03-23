/**
 * Mapa de códigos evdev → etiquetas legibles para el usuario.
 * Los códigos que no están aquí se formatean automáticamente:
 *   KEY_A → "A" | KEY_F1 → "F1" | KEY_1 → "1"
 */
export const KEY_LABELS: Record<string, string> = {
  // Modificadores
  KEY_LEFTCTRL: "Ctrl",
  KEY_RIGHTCTRL: "Ctrl",
  KEY_LEFTSHIFT: "Shift",
  KEY_RIGHTSHIFT: "Shift",
  KEY_LEFTALT: "Alt",
  KEY_RIGHTALT: "AltGr",
  KEY_LEFTMETA: "Super",
  KEY_RIGHTMETA: "Super",

  // Teclas especiales
  KEY_SPACE: "Space",
  KEY_ENTER: "Enter",
  KEY_BACKSPACE: "⌫",
  KEY_TAB: "Tab",
  KEY_ESC: "Esc",
  KEY_DELETE: "Del",
  KEY_INSERT: "Ins",
  KEY_HOME: "Home",
  KEY_END: "End",
  KEY_PAGEUP: "PgUp",
  KEY_PAGEDOWN: "PgDn",
  KEY_CAPSLOCK: "Caps",
  KEY_NUMLOCK: "NumLk",
  KEY_SCROLLLOCK: "ScrLk",
  KEY_PRINTSCREEN: "PrtSc",
  KEY_PAUSE: "Pause",

  // Flechas
  KEY_UP: "↑",
  KEY_DOWN: "↓",
  KEY_LEFT: "←",
  KEY_RIGHT: "→",
};

/**
 * Convierte un código evdev crudo en una etiqueta legible.
 * Ej: "KEY_A" → "A" | "KEY_F1" → "F1" | "KEY_LEFTCTRL" → "Ctrl"
 */
export function formatKeyLabel(raw: string): string {
  if (KEY_LABELS[raw]) return KEY_LABELS[raw];
  const match = raw.match(/^KEY_(.+)$/);
  if (match) {
    const name = match[1];
    // Letras simples → mayúscula, resto → tal cual
    return name.length === 1 ? name.toUpperCase() : name;
  }
  return raw;
}
