import React, { useState } from "react";
import { useData } from "../context/DataContext.jsx";

function Auth() {
  const { state, register, login, logout } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const current = state.users.find(
    (u) => u.id === state.sessions.currentUserId
  );
  if (current) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>{current.email}</span>
        <button className="btn" onClick={logout}>
          Выйти
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        className="input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={() => register({ email, password })}>
        Регистрация
      </button>
      <button
        className="btn btn--primary"
        onClick={() => login({ email, password })}
      >
        Войти
      </button>
    </div>
  );
}

export default function AppealsPage() {
  const { state, addAppeal } = useData();
  const current = state.users.find(
    (u) => u.id === state.sessions.currentUserId
  );
  const [fio, setFio] = useState("");
  const [contacts, setContacts] = useState("");
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!current) return;
    addAppeal({ userId: current.id, fio, contacts, text });
    setFio("");
    setContacts("");
    setText("");
  }

  const myAppeals = state.appeals.filter((a) => a.userId === current?.id);

  return (
    <div style={{ padding: 16 }}>
      <h2>Обращения граждан</h2>
      <Auth />
      {current ? (
        <form
          onSubmit={submit}
          className="card"
          style={{ display: "grid", gap: 8, marginTop: 12, padding: 12 }}
        >
          <input
            className="input"
            placeholder="ФИО"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Контакты"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
            required
          />
          <textarea
            className="input"
            placeholder="Текст обращения"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="btn btn--primary">
            Отправить
          </button>
        </form>
      ) : (
        <p style={{ marginTop: 12 }}>
          Пожалуйста, войдите или зарегистрируйтесь, чтобы отправить обращение.
        </p>
      )}

      <h3 style={{ marginTop: 16 }}>Мои обращения</h3>
      <ul style={{ display: "grid", gap: 8, padding: 0, listStyle: "none" }}>
        {myAppeals.map((a) => (
          <li key={a.id} className="card" style={{ padding: 12 }}>
            <b>{a.status}</b>: {a.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
