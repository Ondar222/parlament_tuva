import React, { useMemo, useState } from "react";
import { useData } from "../context/DataContext.jsx";

function matches(doc, q) {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const hay = [
    doc.title,
    doc.number,
    doc.date,
    doc.category,
    ...(doc.keywords || []),
    doc.contentText || "",
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(query);
}

export function DocumentsList() {
  const { state } = useData();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const cats = useMemo(
    () => [
      "all",
      ...Array.from(new Set(state.documents.map((d) => d.category))),
    ],
    [state.documents]
  );
  const items = useMemo(
    () =>
      state.documents.filter(
        (d) => (cat === "all" ? true : d.category === cat) && matches(d, q)
      ),
    [state.documents, cat, q]
  );
  return (
    <div style={{ padding: 16 }}>
      <h2>Документы</h2>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}
      >
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip ${cat === c ? "chip--active" : ""}`}
          >
            {c === "all" ? "Все" : c}
          </button>
        ))}
        <input
          className="input"
          placeholder="Поиск..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <a href="#/documents/upload" className="btn">
          Загрузить
        </a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Название</th>
            <th>№</th>
            <th>Дата</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              <td>
                <a href={`#/documents/${d.id}`}>{d.title}</a>
              </td>
              <td>{d.number}</td>
              <td>{d.date}</td>
              <td>{d.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocumentUpload() {
  const { addDocument } = useData();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Законы");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [contentDataUrl, setContentDataUrl] = useState("");
  const [contentText, setContentText] = useState("");

  function readFileAsDataUrl(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });
  }
  function readFileAsText(f) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(f);
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    let dataUrl = contentDataUrl;
    let text = contentText;
    if (file) {
      try {
        dataUrl = await readFileAsDataUrl(file);
      } catch {}
      if (file.type.startsWith("text/")) {
        try {
          text = await readFileAsText(file);
        } catch {}
      }
    }
    addDocument({
      title,
      number,
      date,
      category,
      keywords: keywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      type: file?.type || "",
      contentDataUrl: dataUrl,
      contentText: text,
    });
    window.location.hash = "#/documents";
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: 16, display: "grid", gap: 8 }}>
      <h2>Загрузка документа</h2>
      <input
        className="input"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Номер"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        className="input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        className="input"
        placeholder="Категория"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="input"
        placeholder="Ключевые слова (через запятую)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input
        className="input"
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <textarea
        className="input"
        placeholder="Текст для поиска по содержанию (необязательно)"
        value={contentText}
        onChange={(e) => setContentText(e.target.value)}
      />
      <button type="submit" className="btn btn--primary">
        Сохранить
      </button>
    </form>
  );
}

export function DocumentDetail({ id }) {
  const { state, deleteDocument } = useData();
  const d = state.documents.find((x) => x.id === id);
  if (!d) return <div style={{ padding: 16 }}>Документ не найден</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>{d.title}</h2>
      <div style={{ color: "#666" }}>
        {d.number} • {d.date} • {d.category}
      </div>
      <div style={{ margin: "12px 0" }}>
        Ключевые слова: {(d.keywords || []).join(", ")}
      </div>
      <div className="card" style={{ overflow: "hidden", minHeight: 300 }}>
        {d.contentDataUrl ? (
          <iframe
            title="preview"
            src={d.contentDataUrl}
            style={{ width: "100%", height: 480, border: 0 }}
          />
        ) : (
          <div style={{ padding: 16 }}>Предпросмотр недоступен</div>
        )}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {d.contentDataUrl ? (
          <a
            download
            target="_blank"
            rel="noreferrer"
            href={d.contentDataUrl}
            className="btn"
          >
            Скачать
          </a>
        ) : null}
        <button
          className="btn"
          onClick={() => {
            deleteDocument(d.id);
            window.location.hash = "#/documents";
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
