import React, { useState } from "react";
import { useData } from "../context/DataContext.jsx";

export default function AdminPage() {
  const {
    state,
    addSlide,
    deleteSlide,
    addNews,
    deleteNews,
    addEvent,
    deleteEvent,
    addDocument,
    deleteDocument,
    addDeputy,
    deleteDeputy,
  } = useData();
  // Simple forms
  const [slide, setSlide] = useState({
    title: "",
    description: "",
    link: "#",
    image: "/images/preview.png",
  });
  const [news, setNews] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Общее",
    excerpt: "",
    content: "",
    image: "/images/preview.png",
  });
  const [event, setEvent] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    place: "",
    description: "",
  });
  const [doc, setDoc] = useState({
    title: "",
    number: "",
    date: new Date().toISOString().slice(0, 10),
    category: "Законы",
  });
  const [dep, setDep] = useState({
    name: "",
    district: "",
    convocation: "",
    faction: "",
    photo: "/images/preview.png",
    bio: "",
    contacts: { email: "", phone: "" },
    schedule: "",
    declarations: [],
  });

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <h2>Админ-панель</h2>

      <section>
        <h3>Слайды</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            placeholder="Заголовок"
            value={slide.title}
            onChange={(e) => setSlide({ ...slide, title: e.target.value })}
          />
          <input
            placeholder="Описание"
            value={slide.description}
            onChange={(e) =>
              setSlide({ ...slide, description: e.target.value })
            }
          />
          <input
            placeholder="Ссылка"
            value={slide.link}
            onChange={(e) => setSlide({ ...slide, link: e.target.value })}
          />
          <input
            placeholder="Картинка"
            value={slide.image}
            onChange={(e) => setSlide({ ...slide, image: e.target.value })}
          />
          <button onClick={() => addSlide(slide)}>Добавить</button>
        </div>
        <ul>
          {state.slides.map((s) => (
            <li key={s.id}>
              {s.title}{" "}
              <button onClick={() => deleteSlide(s.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Новости</h3>
        <div
          style={{
            display: "grid",
            gap: 6,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <input
            placeholder="Заголовок"
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
          />
          <input
            type="date"
            value={news.date}
            onChange={(e) => setNews({ ...news, date: e.target.value })}
          />
          <input
            placeholder="Категория"
            value={news.category}
            onChange={(e) => setNews({ ...news, category: e.target.value })}
          />
          <input
            placeholder="Изображение"
            value={news.image}
            onChange={(e) => setNews({ ...news, image: e.target.value })}
          />
          <input
            placeholder="Кратко"
            value={news.excerpt}
            onChange={(e) => setNews({ ...news, excerpt: e.target.value })}
          />
          <textarea
            placeholder="Контент"
            value={news.content}
            onChange={(e) => setNews({ ...news, content: e.target.value })}
          />
          <button onClick={() => addNews(news)}>Добавить</button>
        </div>
        <ul>
          {state.news.map((n) => (
            <li key={n.id}>
              {n.date} — {n.title}{" "}
              <button onClick={() => deleteNews(n.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>События</h3>
        <div
          style={{
            display: "grid",
            gap: 6,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <input
            placeholder="Название"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
          <input
            type="date"
            value={event.date}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
          />
          <input
            placeholder="Время"
            value={event.time}
            onChange={(e) => setEvent({ ...event, time: e.target.value })}
          />
          <input
            placeholder="Место"
            value={event.place}
            onChange={(e) => setEvent({ ...event, place: e.target.value })}
          />
          <textarea
            placeholder="Описание"
            value={event.description}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
          <button onClick={() => addEvent(event)}>Добавить</button>
        </div>
        <ul>
          {state.events.map((ev) => (
            <li key={ev.id}>
              {ev.date} {ev.time} — {ev.title}{" "}
              <button onClick={() => deleteEvent(ev.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Документы (быстро)</h3>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <input
            placeholder="Название"
            value={doc.title}
            onChange={(e) => setDoc({ ...doc, title: e.target.value })}
          />
          <input
            placeholder="№"
            value={doc.number}
            onChange={(e) => setDoc({ ...doc, number: e.target.value })}
          />
          <input
            type="date"
            value={doc.date}
            onChange={(e) => setDoc({ ...doc, date: e.target.value })}
          />
          <input
            placeholder="Категория"
            value={doc.category}
            onChange={(e) => setDoc({ ...doc, category: e.target.value })}
          />
          <button onClick={() => addDocument(doc)}>Добавить</button>
        </div>
        <ul>
          {state.documents.map((d) => (
            <li key={d.id}>
              {d.date} — {d.title}{" "}
              <button onClick={() => deleteDocument(d.id)}>Удалить</button>
            </li>
          ))}
        </ul>
        <a href="#/documents/upload">Перейти к загрузке файла</a>
      </section>

      <section>
        <h3>Депутаты (быстро)</h3>
        <div
          style={{
            display: "grid",
            gap: 6,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <input
            placeholder="ФИО"
            value={dep.name}
            onChange={(e) => setDep({ ...dep, name: e.target.value })}
          />
          <input
            placeholder="Округ"
            value={dep.district}
            onChange={(e) => setDep({ ...dep, district: e.target.value })}
          />
          <input
            placeholder="Созыв"
            value={dep.convocation}
            onChange={(e) => setDep({ ...dep, convocation: e.target.value })}
          />
          <input
            placeholder="Фракция"
            value={dep.faction}
            onChange={(e) => setDep({ ...dep, faction: e.target.value })}
          />
          <input
            placeholder="Email"
            value={dep.contacts.email}
            onChange={(e) =>
              setDep({
                ...dep,
                contacts: { ...dep.contacts, email: e.target.value },
              })
            }
          />
          <input
            placeholder="Телефон"
            value={dep.contacts.phone}
            onChange={(e) =>
              setDep({
                ...dep,
                contacts: { ...dep.contacts, phone: e.target.value },
              })
            }
          />
          <textarea
            placeholder="Биография"
            value={dep.bio}
            onChange={(e) => setDep({ ...dep, bio: e.target.value })}
          />
          <input
            placeholder="График"
            value={dep.schedule}
            onChange={(e) => setDep({ ...dep, schedule: e.target.value })}
          />
          <button onClick={() => addDeputy(dep)}>Добавить</button>
        </div>
        <ul>
          {state.deputies.map((d) => (
            <li key={d.id}>
              <a href={`#/deputies/${d.id}`}>{d.name}</a>{" "}
              <button onClick={() => deleteDeputy(d.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
