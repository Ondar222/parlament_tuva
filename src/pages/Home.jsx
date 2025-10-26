import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useData } from "../context/DataContext.jsx";
import Slider from "../components/Slider.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import { useI18n } from "../i18n.js";

function NewsPreview() {
  const { state } = useData();
  const { t } = useI18n();
  const [cat, setCat] = useState("all");
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(state.news.map((n) => n.category)))],
    [state.news]
  );
  const items = useMemo(
    () =>
      state.news
        .slice()
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .filter((n) => (cat === "all" ? true : n.category === cat))
        .slice(0, 5),
    [state.news, cat]
  );
  return (
    <section>
      <h2>{t("home.news")}</h2>
      <select value={cat} onChange={(e) => setCat(e.target.value)}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 12,
        }}
      >
        {items.map((n) => (
          <article key={n.id} className="card news-card">
            <a href={`#/news/${n.id}`} style={{ color: "inherit" }}>
              <div className="news-card__image">
                <ImageWithFallback
                  src={n.image}
                  alt={n.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="news-card__body">
                <span className="badge">{n.category}</span>
                <h3 className="news-card__title">{n.title}</h3>
                <p className="news-card__excerpt">{n.excerpt}</p>
                <div className="news-card__footer">
                  <time className="news-card__date">
                    {new Date(n.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span className="link-more">Подробнее</span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <a href="#/news">Архив новостей</a>
      </div>
    </section>
  );
}

function EventModal({ open, onClose, events }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close icon-btn"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <div className="modal__content">
          <h3 style={{ margin: 0 }}>Мероприятия</h3>
          <div className="grid">
            {events.map((ev) => (
              <div key={ev.id} className="card" style={{ padding: 12 }}>
                <h4 style={{ margin: "0 0 6px" }}>{ev.title}</h4>
                <div style={{ color: "#0a3b72", fontWeight: 600 }}>
                  {new Date(ev.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {ev.time ? ` • ${ev.time}` : ""}
                </div>
                {ev.place ? <div className="text-muted">{ev.place}</div> : null}
                {ev.description ? (
                  <p style={{ marginBottom: 0 }}>{ev.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Calendar() {
  const { state } = useData();
  const { t } = useI18n();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [openedDayEvents, setOpenedDayEvents] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const startWeekday = (start.getDay() + 6) % 7; // Mon=0..Sun=6
  const dayCount = end.getDate();
  const gridCells = startWeekday + dayCount;
  const rows = Math.ceil(gridCells / 7);
  const cells = Array.from({ length: rows * 7 }, (_, i) => {
    const dayNum = i - startWeekday + 1;
    if (dayNum < 1 || dayNum > dayCount) return null;
    return new Date(year, month, dayNum);
  });

  const eventsByDateKey = useMemo(() => {
    const map = new Map();
    state.events.forEach((ev) => {
      const d = new Date(ev.date);
      const k = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(ev);
    });
    return map;
  }, [state.events]);

  const monthName = viewDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
  });
  return (
    <section>
      <h2>{t("home.calendar")}</h2>
      <div className="calendar">
        <div className="calendar__header">
          <button
            type="button"
            className="icon-btn"
            aria-label="Предыдущий месяц"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
          >
            ‹
          </button>
          <div className="calendar__title">{monthName}</div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Следующий месяц"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
          >
            ›
          </button>
        </div>
        <div className="calendar__grid">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((w) => (
            <div key={w} className="calendar__weekday">
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="calendar__day _empty" />;
            const k = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
            const evs = eventsByDateKey.get(k) || [];
            const has = evs.length > 0;
            return (
              <button
                key={i}
                className={`calendar__day ${has ? "_has" : ""}`}
                onClick={() => has && setOpenedDayEvents(evs)}
                type="button"
              >
                <div className="calendar__daynum">{d.getDate()}</div>
                {has ? (
                  <div className="calendar__dots">
                    {evs.slice(0, 3).map((_, j) => (
                      <span key={j} className="calendar__dot" />
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      <EventModal
        open={!!openedDayEvents}
        onClose={() => setOpenedDayEvents(null)}
        events={openedDayEvents || []}
      />
    </section>
  );
}

export default function Home() {
  const { state } = useData();
  return (
    <div style={{ display: "grid", gap: 20, padding: 16, lineHeight: 1.5 }}>
      <Slider slides={state.slides} />
      <NewsPreview />
      <Calendar />
    </div>
  );
}
