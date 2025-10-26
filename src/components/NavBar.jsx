import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useData } from "../context/DataContext.jsx";
import { useI18n } from "../i18n.js";

function AuthModal({ open, onClose }) {
  const { state, register, login, logout } = useData();
  const current = state.users.find(
    (u) => u.id === state.sessions.currentUserId
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("login");
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
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
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Закрыть"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="modal__content">
          {current ? (
            <div className="grid">
              <div className="card" style={{ padding: 12 }}>
                <h3 style={{ margin: "4px 0 8px" }}>Личный кабинет</h3>
                <div style={{ marginBottom: 8 }}>{current.email}</div>
                <button
                  className="btn"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginTop: 0 }}>Авторизация</h3>
              <div className="tabs" style={{ marginBottom: 10 }}>
                <div className="tabs__list">
                  <button
                    className={`tabs__btn ${tab === "login" ? "_active" : ""}`}
                    onClick={() => setTab("login")}
                    type="button"
                  >
                    Вход
                  </button>
                  <button
                    className={`tabs__btn ${
                      tab === "register" ? "_active" : ""
                    }`}
                    onClick={() => setTab("register")}
                    type="button"
                  >
                    Регистрация
                  </button>
                </div>
              </div>
              {tab === "login" ? (
                <form
                  className="card"
                  style={{ padding: 12 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    login({ email, password });
                    onClose();
                  }}
                >
                  <h4 style={{ marginTop: 0 }}>Войти</h4>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn--primary" type="submit">
                    Войти
                  </button>
                </form>
              ) : (
                <form
                  className="card"
                  style={{ padding: 12 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    register({ email, password });
                    onClose();
                  }}
                >
                  <h4 style={{ marginTop: 0 }}>Регистрация</h4>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn" type="submit">
                    Зарегистрироваться
                  </button>
                </form>
              )}
            </div>
          )}
          <div className="text-muted" style={{ marginTop: 8 }}>
            Позже добавим вход через Госуслуги (ЕСИА).
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function NavBar() {
  const { state, setSettings } = useData();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const path = useMemo(() => window.location.hash || "#/", []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href) =>
    (window.location.hash || "#/").replace(/^#/, "#") === href ? "_active" : "";

  return (
    <nav className="nav">
      <div className="nav__inner container">
        <a href="#/" className="nav__brand" aria-label="Верховный Хурал">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
            alt=""
            width="20"
            height="20"
            style={{ marginRight: 8 }}
          />
          <span>
            Верховный Хурал
            <span className="nav__brand-sub">(парламент) Республики Тыва</span>
          </span>
        </a>
        <div className="nav__spacer" />
        <button
          className="nav__lang nav__lang-pill"
          onClick={() =>
            setSettings({
              language: state.settings.language === "ru" ? "ty" : "ru",
            })
          }
          aria-label="Сменить язык"
        >
          {state.settings.language === "ru" ? "ТЫВА" : "RU"}
        </button>
        <button
          className="btn nav__login"
          style={{ marginLeft: 8 }}
          onClick={() => {
            setOpen(false);
            setAuthOpen(true);
          }}
        >
          Войти
        </button>
        <button
          aria-label="Меню"
          className="nav__burger"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* Desktop links */}
        <div className="nav__links nav__links--desktop">
          <a href="#/" className={active("#/")}>
            {t("nav.home")}
          </a>
          <a href="#/about" className={active("#/about")}>
            {t("nav.about")}
          </a>
          <a href="#/structure" className={active("#/structure")}>
            {t("nav.structure")}
          </a>
          <a href="#/deputies" className={active("#/deputies")}>
            {t("nav.deputies")}
          </a>
          <a href="#/documents" className={active("#/documents")}>
            {t("nav.documents")}
          </a>
          <a href="#/news" className={active("#/news")}>
            {t("nav.news")}
          </a>
          <a href="#/appeals" className={active("#/appeals")}>
            {t("nav.appeals")}
          </a>
          {/* <a href="#/admin" className={active("#/admin")}>
            {t("nav.admin")}
          </a> */}
        </div>
      </div>
      {/* Mobile panel */}
      {open ? (
        <div className="nav__overlay" onClick={() => setOpen(false)}></div>
      ) : null}
      <div className={`nav__links nav__links--mobile ${open ? "_open" : ""}`}>
        <button
          aria-label="Закрыть меню"
          className="nav__close icon-btn"
          onClick={() => setOpen(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <a href="#/" onClick={() => setOpen(false)}>
          {t("nav.home")}
        </a>
        <a href="#/about" onClick={() => setOpen(false)}>
          {t("nav.about")}
        </a>
        <a href="#/structure" onClick={() => setOpen(false)}>
          {t("nav.structure")}
        </a>
        <a href="#/deputies" onClick={() => setOpen(false)}>
          {t("nav.deputies")}
        </a>
        <a href="#/documents" onClick={() => setOpen(false)}>
          {t("nav.documents")}
        </a>
        <a href="#/news" onClick={() => setOpen(false)}>
          {t("nav.news")}
        </a>
        <a href="#/appeals" onClick={() => setOpen(false)}>
          {t("nav.appeals")}
        </a>
        {/* <a href="#/admin" onClick={() => setOpen(false)}>
          {t("nav.admin")}
        </a> */}
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
