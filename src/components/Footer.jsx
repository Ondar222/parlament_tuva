import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer--dark">
      <div className="footer__inner container">
        <div className="footer__brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
            alt=""
            width="18"
            height="18"
            style={{ marginRight: 6 }}
          />
          Верховный Хурал Республики Тыва
        </div>
      </div>
      <div className="container" style={{ padding: "0 16px 16px" }}>
        <div className="footer__cols">
          <div>
            <div className="footer__title">Контакты</div>
            <div>667000, Республика Тыва, г. Кызыл, ул. Ленина, 32 </div>
            <div>Email: khural@inbox.ru </div>
            <div>
              Телефон:
              <ul>
                <li>
                  {" "}
                  <a href="tel:+7 (39422) 2-16-36">
                    +7 (39422) 2-16-36(Приемная )
                  </a>{" "}
                </li>
                <li>
                  <a href="tel:+7 (39422) 2-10-43">
                    +7 (39422) 2-10-43(Канцелярия )
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="footer__title">Режим работы</div>
            <div>Понедельник - Пятница</div>
            <div>
              08:30 - 17:30 <br />
              перерыв на обед: 13.00 - 14.00
            </div>
          </div>
          <div>
            <div className="footer__title">Официальные ресурсы</div>
            <div>
              <a href="#" rel="noreferrer">
                Правительство РТ
              </a>
            </div>
            <div>
              <a href="#" rel="noreferrer">
                Правительство РФ
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          © 2025 Верховный Хурал Республики Тыва
        </div>
      </div>
    </footer>
  );
}
