import { useEffect, useRef, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { formatKeyLabel } from "../utils/keyLabels";

export interface KeyEntry {
  id: number;
  label: string;
}

const MAX_KEYS = 6;
const CLEAR_DELAY_MS = 2500;
let nextId = 0;

/**
 * Hook que escucha el evento "key-event" de Tauri y mantiene
 * un historial de las últimas teclas presionadas.
 * Las teclas se limpian automáticamente después de CLEAR_DELAY_MS
 * milisegundos sin actividad.
 */
export function useKeyEvents(): KeyEntry[] {
  const [keys, setKeys] = useState<KeyEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetClearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setKeys([]), CLEAR_DELAY_MS);
  };

  useEffect(() => {
    const unlistenPromise = listen<string>("key-event", (event) => {
      const label = formatKeyLabel(event.payload);
      setKeys((prev) => [...prev, { id: nextId++, label }].slice(-MAX_KEYS));
      resetClearTimer();
    });

    return () => {
      unlistenPromise.then((f) => f());
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return keys;
}
