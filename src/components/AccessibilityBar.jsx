import React, { useEffect } from "react";
import { useData } from "../context/DataContext.jsx";

export default function AccessibilityBar() {
  const { state, setSettings } = useData();

  useEffect(() => {
    document.body.style.setProperty(
      "--font-scale",
      String(state.settings.fontScale)
    );
    document.body.dataset.contrast = state.settings.contrast;
    document.body.dataset.reduceMotion = state.settings.reduceMotion
      ? "1"
      : "0";
    document.documentElement.lang = state.settings.language || "ru";
  }, [state.settings]);

  return (
    <div
      className="access-bar"
      style={{
        display: "flex",
        gap: 8,
        padding: 8,
        background: "#f5f5f5",
        borderBottom: "1px solid #eee",
      }}
    >
      <button
        onClick={() =>
          setSettings({
            fontScale: Math.max(0.8, state.settings.fontScale - 0.1),
          })
        }
      >
        A-
      </button>
      <button
        onClick={() =>
          setSettings({
            fontScale: Math.min(1.6, state.settings.fontScale + 0.1),
          })
        }
      >
        A+
      </button>
      <select
        value={state.settings.contrast}
        onChange={(e) => setSettings({ contrast: e.target.value })}
      >
        <option value="normal">Обычная</option>
        <option value="dark">Черный фон</option>
        <option value="blackYellow">Желтый на черном</option>
        <option value="yellowBlack">Черный на желтом</option>
      </select>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="checkbox"
          checked={state.settings.reduceMotion}
          onChange={(e) => setSettings({ reduceMotion: e.target.checked })}
        />
        Откл. анимации
      </label>
    </div>
  );
}
