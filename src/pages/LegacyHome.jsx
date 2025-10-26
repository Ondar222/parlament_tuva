import React, { useEffect, useRef, useState } from "react";

export default function LegacyHome() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function stripChrome(doc) {
      // Remove obvious header/footer containers to avoid duplication
      ["header", "footer", ".header", ".footer", "#panel"].forEach((sel) => {
        const nodes = doc.querySelectorAll(sel);
        nodes.forEach((n) => n.parentElement && n.parentElement.removeChild(n));
      });
      return doc;
    }

    function loadScriptElement(scriptEl) {
      return new Promise((resolve) => {
        const s = document.createElement("script");
        for (const { name, value } of Array.from(scriptEl.attributes)) {
          s.setAttribute(name, value);
        }
        if (scriptEl.src) {
          s.async = false;
          s.onload = () => resolve();
          s.onerror = () => resolve();
          document.body.appendChild(s);
        } else {
          s.text = scriptEl.textContent || "";
          document.body.appendChild(s);
          resolve();
        }
      });
    }

    async function run() {
      try {
        const res = await fetch("/index-legacy.html", { cache: "no-store" });
        const html = await res.text();
        if (cancelled) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        stripChrome(doc);

        // Collect scripts (head first, then body)
        const headScripts = Array.from(doc.head.querySelectorAll("script"));
        const bodyScripts = Array.from(doc.body.querySelectorAll("script"));
        bodyScripts.forEach(
          (s) => s.parentElement && s.parentElement.removeChild(s)
        );

        if (containerRef.current) {
          containerRef.current.innerHTML = doc.body.innerHTML;
        }

        for (const s of headScripts) {
          try {
            // sequential
            /* eslint-disable no-await-in-loop */
            await loadScriptElement(s);
            /* eslint-enable no-await-in-loop */
          } catch {}
        }
        for (const s of bodyScripts) {
          try {
            /* eslint-disable no-await-in-loop */
            await loadScriptElement(s);
            /* eslint-enable no-await-in-loop */
          } catch {}
        }

        if (!cancelled) setLoaded(true);
      } catch (e) {
        console.error("Failed to load legacy home", e);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div style={{ display: loaded ? "none" : "block", padding: 16 }}>
        Загрузка…
      </div>
      <div ref={containerRef} />
    </div>
  );
}
