import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

function KeyOverlay() {
  const [ultimaTecla, setUltimaTecla] = useState("Esperando tecla...");

  useEffect(() => {
    const unlisten = listen<string>("key-event", (event) => {
      setUltimaTecla(event.payload);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "3rem",
        color: "black",
        backgroundColor: "transparent",
      }}
    >
      {ultimaTecla}
    </div>
  );
}

export default KeyOverlay;
