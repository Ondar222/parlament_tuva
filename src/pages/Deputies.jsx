import React, { useMemo, useState } from "react";
import { useData } from "../context/DataContext.jsx";
import ImageWithFallback from "../components/ImageWithFallback.jsx";

export function DeputiesList() {
  const { state } = useData();
  const [district, setDistrict] = useState("all");
  const [convocation, setConvocation] = useState("all");
  const [faction, setFaction] = useState("all");
  const districts = useMemo(
    () => [
      "all",
      ...Array.from(new Set(state.deputies.map((d) => d.district))),
    ],
    [state.deputies]
  );
  const convocations = useMemo(
    () => [
      "all",
      ...Array.from(new Set(state.deputies.map((d) => d.convocation))),
    ],
    [state.deputies]
  );
  const factions = useMemo(
    () => ["all", ...Array.from(new Set(state.deputies.map((d) => d.faction)))],
    [state.deputies]
  );
  const items = useMemo(
    () =>
      state.deputies.filter(
        (d) =>
          (district === "all" || d.district === district) &&
          (convocation === "all" || d.convocation === convocation) &&
          (faction === "all" || d.faction === faction)
      ),
    [state.deputies, district, convocation, faction]
  );
  return (
    <div style={{ padding: 16 }}>
      <h2>Депутаты</h2>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}
      >
        {districts.map((v) => (
          <button
            key={v}
            onClick={() => setDistrict(v)}
            className={`chip ${district === v ? "chip--active" : ""}`}
          >
            {v === "all" ? "Все округа" : v}
          </button>
        ))}
        {convocations.map((v) => (
          <button
            key={v}
            onClick={() => setConvocation(v)}
            className={`chip ${convocation === v ? "chip--active" : ""}`}
          >
            {v === "all" ? "Все созывы" : v}
          </button>
        ))}
        {factions.map((v) => (
          <button
            key={v}
            onClick={() => setFaction(v)}
            className={`chip ${faction === v ? "chip--active" : ""}`}
          >
            {v === "all" ? "Все фракции" : v}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))",
          gap: 12,
        }}
      >
        {items.map((d) => (
          <a
            key={d.id}
            href={`#/deputies/${d.id}`}
            className="card"
            style={{ overflow: "hidden", color: "inherit" }}
          >
            <ImageWithFallback
              src={d.photo}
              alt={d.name}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div style={{ padding: 10 }}>
              <h4 style={{ margin: "6px 0" }}>{d.name}</h4>
              <div style={{ color: "#666" }}>
                {d.district} • {d.convocation} • {d.faction}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function DeputyDetail({ id }) {
  const { state, updateDeputy } = useData();
  const d = state.deputies.find((x) => x.id === id);
  const [file, setFile] = useState(null);
  if (!d) return <div style={{ padding: 16 }}>Депутат не найден</div>;
  async function onAddDeclaration() {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      const decl = { id: "decl" + Date.now(), title: file.name, url };
      updateDeputy(d.id, { declarations: [...(d.declarations || []), decl] });
    };
    reader.readAsDataURL(file);
  }
  return (
    <div style={{ padding: 16 }}>
      <h2>{d.name}</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <ImageWithFallback
          src={d.photo}
          alt={d.name}
          style={{
            width: 240,
            height: 240,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
        <div className="card" style={{ padding: 12, flex: 1, minWidth: 260 }}>
          <div>
            <b>Округ:</b> {d.district}
          </div>
          <div>
            <b>Созыв:</b> {d.convocation}
          </div>
          <div>
            <b>Фракция:</b> {d.faction}
          </div>
          <div>
            <b>Контакты:</b> {d.contacts?.email} • {d.contacts?.phone}
          </div>
          <div>
            <b>График приема:</b> {d.schedule}
          </div>
        </div>
      </div>
      <h3>Биография</h3>
      <p>{d.bio}</p>
      {d.legislative?.length ? (
        <>
          <h3>Законодательная деятельность</h3>
          <ul>
            {d.legislative.map((it) => (
              <li key={it.id}>
                {it.title}{" "}
                {it.link ? (
                  <a href={it.link} style={{ marginLeft: 6 }}>
                    Документ
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <h3>Декларации</h3>
      <ul>
        {(d.declarations || []).map((de) => (
          <li key={de.id}>
            <a href={de.url} target="_blank" rel="noreferrer">
              {de.title}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="btn" onClick={onAddDeclaration}>
          Добавить декларацию (PDF)
        </button>
      </div>
    </div>
  );
}
