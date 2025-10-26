import React from "react";

export function About() {
  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <h2>О Верховном Хурале (парламенте) Республики Тыва</h2>
      <section>
        <h3>Общие сведения</h3>
        <p>
          Верховный Хурал Республики Тыва — представительный и законодательный
          орган государственной власти Республики Тыва. Он осуществляет принятие
          законов республики, формирует правовую основу социально-экономического
          развития, обеспечивает связь с гражданами и общественными
          объединениями.
        </p>
      </section>
      <section>
        <h3>История</h3>
        <p>
          История парламентаризма в Тыве берет начало с первых представительных
          органов Тувинской Народной Республики. Современный Верховный Хурал
          сформирован как парламент субъекта Российской Федерации и действует на
          основании Конституции РФ и Конституции Республики Тыва.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {[
            "/images/news1.jpeg",
            "/images/news2.jpeg",
            "/images/news3.jpeg",
            "/images/news4.jpeg",
          ].map((src) => (
            <figure
              key={src}
              className="card"
              style={{ margin: 0, overflow: "hidden" }}
            >
              <img
                src={src}
                alt="Историческое фото"
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
            </figure>
          ))}
        </div>
      </section>
      <section>
        <h3>Полномочия</h3>
        <ul>
          <li>Принятие законов Республики Тыва;</li>
          <li>
            Утверждение республиканского бюджета и отчета о его исполнении;
          </li>
          <li>
            Определение основных направлений внутренней политики республики;
          </li>
          <li>Парламентский контроль за органами исполнительной власти;</li>
          <li>
            Назначение и согласование должностных лиц в соответствии с
            законодательством.
          </li>
        </ul>
      </section>
      <section>
        <h3>Видео</h3>
        <div className="card" style={{ overflow: "hidden" }}>
          <video
            controls
            style={{ width: "100%", display: "block" }}
            poster="/images/news5.jpeg"
          >
            <source
              src="/media/output_compress_video_online.com_.mp4"
              type="video/mp4"
            />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </section>
      <section>
        <h3>Открытость и взаимодействие</h3>
        <p>
          Парламент открыт для диалога с гражданами. На сайте доступны новости,
          документы, сведения о депутатах и форма для подачи обращений.
        </p>
      </section>
    </div>
  );
}
export function Structure() {
  const items = [
    {
      key: "management",
      title: "Руководство",
      desc: "Руководство",
    },
    {
      key: "deputies",
      title: "Депутаты",
      desc: "Депутаты",
    },
    {
      key: "deputies_of_all_convocations",
      title: "Депутаты всех созывов",
      desc: "Депутаты всех созывов",
    },
    {
      key: "representation_in_the_Federation_Council",
      title: "Представительство  в Совете Федерации",
      desc: "Представительство  в Совете Федерации",
    },
    {
      key: "parliamentary_factions",
      title: "Депутатские фракции",
      desc: "Депутатские фракции",
    },
    {
      key: "committees",
      title: "Комитеты",
      desc: "Комитеты",
    },
    {
      key: "commissions",
      title: "Коммиссии",
      desc: "Коммиссии",
    },
    {
      key: "Council_for_Interaction_with_Representative_Bodies_of_Municipalities",
      title:
        "Совет по взаимодействию с представительными органами муниципальных образований",
      desc: "Совет по взаимодействию с представительными органами муниципальных образований",
    },
    {
      key: "apparatus",
      title: "Аппарат",
      desc: "Аппарат",
    },
    {
      key: "youth Parliament",
      title: "Молодежный парламент",
      desc: "Молодежный парламент",
    },
  ];
  return (
    <div style={{ padding: 16 }}>
      <h2>Структура управления</h2>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
        }}
      >
        {items.map((it) => (
          <a
            key={it.key}
            href={`#/structure/${it.key}`}
            className="card"
            style={{ padding: 12, color: "inherit" }}
          >
            <h3 style={{ marginTop: 0 }}>{it.title}</h3>
            <p style={{ margin: 0 }}>{it.desc}</p>
          </a>
        ))}
      </div>
      <p className="text-muted" style={{ marginTop: 12 }}>
        Нажмите на раздел, чтобы перейти к подробной информации подразделения.
      </p>
    </div>
  );
}
export function StructureDetail({ id }) {
  const dict = new Map([
    [
      "management",
      {
        title: "Руководство",
        desc: "Информация о Председателе Верховного Хурала, его заместителях, полномочиях и приёме граждан.",
      },
    ],
    [
      "deputies",
      {
        title: "Депутаты",
        desc: "Состав депутатского корпуса, контакты, биографии, сведения о законодательной деятельности.",
      },
    ],
    [
      "deputies_of_all_convocations",
      {
        title: "Депутаты всех созывов",
        desc: "Справочник депутатов прошлых созывов.",
      },
    ],
    [
      "representation_in_the_Federation_Council",
      {
        title: "Представительство в Совете Федерации",
        desc: "Информация о представителе Республики Тыва в Совете Федерации.",
      },
    ],
    [
      "parliamentary_factions",
      {
        title: "Депутатские фракции",
        desc: "Состав и контакты парламентских фракций.",
      },
    ],
    [
      "committees",
      { title: "Комитеты", desc: "Постоянные комитеты и их председатели." },
    ],
    [
      "commissions",
      {
        title: "Комиссии",
        desc: "Временные и постоянные комиссии парламента.",
      },
    ],
    [
      "Council_for_Interaction_with_Representative_Bodies_of_Municipalities",
      {
        title: "Совет по взаимодействию",
        desc: "Взаимодействие с представительными органами муниципалитетов.",
      },
    ],
    [
      "apparatus",
      { title: "Аппарат", desc: "Структура и контакты аппарата парламента." },
    ],
    [
      "youth Parliament",
      { title: "Молодежный парламент", desc: "Проекты и состав." },
    ],
  ]);
  const data = dict.get(id);
  if (!data)
    return (
      <div style={{ padding: 16 }}>
        <h2>Раздел не найден</h2>
        <a href="#/structure">Вернуться к структуре</a>
      </div>
    );
  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <h2>{data.title}</h2>
      <section>
        <p style={{ margin: 0 }}>{data.desc}</p>
      </section>
      <a className="btn" href="#/structure" style={{ width: "fit-content" }}>
        ← К структуре
      </a>
    </div>
  );
}
export function Deputies() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Депутаты</h2>
      <p>Фильтры по округу/созыву/фракции (в разработке).</p>
    </div>
  );
}
export function Documents() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Документы</h2>
      <p>Каталог, загрузка, поиск, предпросмотр (в разработке).</p>
    </div>
  );
}
export function NewsPage() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Новости</h2>
      <p>Категории и архив (в разработке).</p>
    </div>
  );
}
export function Appeals() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Обращения</h2>
      <p>Личный кабинет, подача и статусы (в разработке).</p>
    </div>
  );
}
export function Admin() {
  return (
    <div style={{ padding: 16 }}>
      <h2>Админ-панель</h2>
      <p>Слайды/новости/события/депутаты/документы (в разработке).</p>
    </div>
  );
}
