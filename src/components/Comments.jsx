import React, { useMemo, useState } from "react";
import { useData } from "../context/DataContext.jsx";

export default function Comments({ newsId }) {
  const { state, addComment, deleteComment } = useData();
  const list = useMemo(
    () => state.comments[newsId] || [],
    [state.comments, newsId]
  );
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(newsId, {
      author: author.trim() || "Аноним",
      text: text.trim(),
      date: new Date().toISOString(),
    });
    setText("");
  }

  return (
    <section
      className="card"
      style={{ padding: 12, marginTop: 16 }}
      aria-labelledby={`comments-${newsId}`}
    >
      <h3 id={`comments-${newsId}`}>Комментарии</h3>
      <form
        onSubmit={submit}
        style={{ display: "grid", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Ваше имя"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Ваш комментарий"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn--primary"
          style={{ justifySelf: "start" }}
        >
          Отправить
        </button>
      </form>
      <ul
        style={{
          padding: 0,
          margin: 0,
          listStyle: "none",
          display: "grid",
          gap: 8,
        }}
      >
        {list.map((c) => (
          <li key={c.id} className="card" style={{ padding: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>{c.author}</strong>
              <button
                className="btn"
                onClick={() => deleteComment(newsId, c.id)}
              >
                Удалить
              </button>
            </div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              {new Date(c.date).toLocaleString()}
            </div>
            <p style={{ margin: "6px 0 0" }}>{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
