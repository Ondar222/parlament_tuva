import React, { useEffect, useRef, useState } from "react";
import { DataProvider } from "./context/DataContext.jsx";
import NavBar from "./components/NavBar.jsx";
import AccessibilityBar from "./components/AccessibilityBar.jsx";
import Home from "./pages/Home.jsx";
import { About, Structure, StructureDetail } from "./pages/Placeholders.jsx";
import { NewsList, NewsArchive, NewsDetail } from "./pages/News.jsx";
import {
  DocumentsList,
  DocumentUpload,
  DocumentDetail,
} from "./pages/Documents.jsx";
import { DeputiesList, DeputyDetail } from "./pages/Deputies.jsx";
import AppealsPage from "./pages/Appeals.jsx";
import AdminPage from "./pages/Admin.jsx";
import Footer from "./components/Footer.jsx";

function setRouteCookie(value) {
  try {
    document.cookie = `route=${encodeURIComponent(
      value
    )}; path=/; max-age=2592000`;
  } catch {}
}
function getRouteCookie() {
  try {
    const m = document.cookie.match(/(?:^|; )route=([^;]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function RouterView() {
  const initial = getRouteCookie() || window.location.hash || "#/";
  const [hash, setHash] = useState(initial);
  useEffect(() => {
    if (!window.location.hash && initial) window.location.hash = initial;
    const onHash = () => {
      const h = window.location.hash || "#/";
      setHash(h);
      setRouteCookie(h);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // cross-tab sync via localStorage ping
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "parlament_tuva_data_v1") {
        // trigger rerender by updating state cookie route if hash differs
        if (window.location.hash !== hash) {
          // do nothing; route is hash-controlled
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hash]);

  const path = (hash || "#/").replace(/^#/, "");
  if (path === "/" || path === "") return <Home />;
  if (path.startsWith("/about")) return <About />;
  if (path.startsWith("/structure/")) {
    const id = path.split("/")[2];
    return <StructureDetail id={id} />;
  }
  if (path.startsWith("/structure")) return <Structure />;
  if (path === "/deputies") return <DeputiesList />;
  if (path.startsWith("/deputies/")) {
    const id = path.split("/")[2];
    return <DeputyDetail id={id} />;
  }
  if (path === "/documents") return <DocumentsList />;
  if (path === "/documents/upload") return <DocumentUpload />;
  if (path.startsWith("/documents/")) {
    const id = path.split("/")[2];
    return <DocumentDetail id={id} />;
  }
  if (path === "/news") return <NewsList />;
  if (path === "/news/archive") return <NewsArchive />;
  if (path.startsWith("/news/")) {
    const id = path.split("/")[2];
    return <NewsDetail id={id} />;
  }
  if (path.startsWith("/appeals")) return <AppealsPage />;
  if (path.startsWith("/admin")) return <AdminPage />;
  return <div style={{ padding: 16 }}>Страница не найдена</div>;
}

export default function App() {
  return (
    <DataProvider>
      <AccessibilityBar />
      <NavBar />
      <main>
        <RouterView />
      </main>
      <Footer />
    </DataProvider>
  );
}
