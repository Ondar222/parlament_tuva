import React, { useMemo, useState } from "react";
import { useData } from "../context/DataContext.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";
import Comments from "../components/Comments.jsx";

export function NewsList() {
  const { state } = useData();
  const [cat, setCat] = useState("all");
  const cats = useMemo(
    () => ["all", ...Array.from(new Set(state.news.map((n) => n.category)))],
    [state.news]
  );
  const items = useMemo(
    () => state.news.filter((n) => (cat === "all" ? true : n.category === cat)),
    [state.news, cat]
  );
  return (
    <div style={{ padding: 16 }}>
      <h2>Новости</h2>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#5b6a7a" }}>Категория</span>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip ${cat === c ? "chip--active" : ""}`}
            aria-pressed={cat === c}
          >
            {c === "all" ? "Все новости" : c}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))",
          gap: 16,
          marginTop: 16,
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
                <time className="news-card__date">
                  {new Date(n.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export function NewsArchive() {
  const { state } = useData();
  const byYearMonth = useMemo(() => {
    const map = new Map();
    state.news.forEach((n) => {
      const d = new Date(n.date);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(n);
    });
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [state.news]);
  return (
    <div style={{ padding: 16 }}>
      <h2>Архив новостей</h2>
      {byYearMonth.map(([ym, list]) => (
        <section key={ym} style={{ marginBottom: 16 }}>
          <h3>{ym}</h3>
          <ul>
            {list.map((n) => (
              <li key={n.id}>
                <a href={`#/news/${n.id}`}>
                  {n.date} — {n.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function shareVk(url, title) {
  const u = new URL("https://vk.com/share.php");
  u.searchParams.set("url", url);
  u.searchParams.set("title", title);
  window.open(u.toString(), "_blank");
}
function shareTg(url, title) {
  const u = new URL("https://t.me/share/url");
  u.searchParams.set("url", url);
  u.searchParams.set("text", title);
  window.open(u.toString(), "_blank");
}

export function NewsDetail({ id }) {
  const { state } = useData();
  const item = state.news.find((n) => n.id === id);
  if (!item) return <div style={{ padding: 16 }}>Новость не найдена</div>;
  const pageUrl = window.location.href;
  return (
    <article style={{ padding: 16 }}>
      <h1>{item.title}</h1>
      <time style={{ color: "#666" }}>{item.date}</time>
      <div style={{ margin: "12px 0" }}>
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            maxHeight: 380,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      </div>
      <div>{item.content}</div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={() => shareVk(pageUrl, item.title)}>
          Поделиться ВК
        </button>
        <button onClick={() => shareTg(pageUrl, item.title)}>
          Поделиться Telegram
        </button>
      </div>
      <Comments newsId={id} />
    </article>
  );
}
