import React, { useEffect, useState } from "react";
import ImageWithFallback from "./ImageWithFallback.jsx";

export default function Slider({ slides = [], intervalMs = 5000 }) {
  const [idx, setIdx] = useState(0);
  const visible = slides.slice(0, 5);

  useEffect(() => {
    // Preconnect/prefetch external image origins for speed
    const origins = Array.from(
      new Set(
        visible
          .map((s) => s.image)
          .filter(Boolean)
          .filter((u) => /^https?:/i.test(u))
          .map((u) => {
            try {
              return new URL(u).origin;
            } catch {
              return null;
            }
          })
          .filter(Boolean)
      )
    );
    const links = origins.map((origin) => {
      const l = document.createElement("link");
      l.rel = "preconnect";
      l.href = origin;
      l.crossOrigin = "anonymous";
      document.head.appendChild(l);
      return l;
    });
    return () => links.forEach((l) => l.remove());
  }, [visible]);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % (visible.length || 1));
    }, intervalMs);
    return () => clearInterval(id);
  }, [visible.length, intervalMs]);

  if (!visible.length) return null;

  const s = visible[idx];
  const prev = () => setIdx((i) => (i - 1 + visible.length) % visible.length);
  const next = () => setIdx((i) => (i + 1) % visible.length);

  return (
    <div
      className="slider card"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="slider__frame">
        <ImageWithFallback
          src={s.image}
          alt={s.title}
          priority
          style={{
            width: "100%",
            height: "var(--slider-h, 420px)",
            objectFit: "cover",
          }}
        />
        <div className="slider__overlay" />
        <div className="slider__content">
          <h2 style={{ margin: 0, color: "white" }}>{s.title}</h2>
          {s.description ? (
            <p style={{ marginTop: 8, maxWidth: 720 }}>{s.description}</p>
          ) : null}
          {s.link ? (
            <a href={s.link} className="btn btn--accent">
              Подробнее
            </a>
          ) : null}
        </div>
      </div>
      <button
        className="slider__arrow slider__arrow--left"
        aria-label="Предыдущий слайд"
        onClick={prev}
      >
        ‹
      </button>
      <button
        className="slider__arrow slider__arrow--right"
        aria-label="Следующий слайд"
        onClick={next}
      >
        ›
      </button>
      <div className="slider__dots">
        {visible.map((_, i) => (
          <button
            key={i}
            aria-label={`К слайду ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`slider__dot ${i === idx ? "_active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
