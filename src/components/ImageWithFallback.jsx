import React, { useMemo, useState } from "react";

export default function ImageWithFallback({
  src,
  alt = "",
  loading = "lazy",
  priority = false,
  ...rest
}) {
  const [err, setErr] = useState(false);

  const pool = useMemo(
    () => [
      "/images/preview.png",
      "/images/lg.png",
      "/images/md.png",
      "/images/sm.png",
      "/images/xl.png",
      "/images/TBHxj6Ic3SpjQe4gRugQ4TQHQ_SBJqONxxO_xLC_46hCObjiXzoajkhAKwoaK31vummOFeD7nGBXnsD5QJ7i63ek.jpg",
      "/images/dYmmzqMQ_HqchYdgwdLSWRzFc2uLgbB10LIiaycKe_6sGI9k38rfvpfNl6Aw74IbfY_vnpnhnO2Lbq_6dEYAeuua_min.jpg",
    ],
    []
  );

  function normalize(url) {
    if (!url) return "";
    const u = String(url).trim();
    if (/^(https?:|data:|blob:)/i.test(u)) return u; // full URLs & data
    if (u.startsWith("/images/")) return u; // already correct
    if (u.startsWith("images/")) return "/" + u; // add leading slash
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(u)) return "/images/" + u; // bare filename
    return u; // fallback
  }

  const normalized = normalize(src);
  const fallback = useMemo(
    () => pool[Math.floor(Math.random() * pool.length)],
    [pool]
  );
  const finalSrc = !normalized || err ? fallback : normalized;
  const isRemote = /^https?:/i.test(finalSrc);

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={priority ? "eager" : loading}
      decoding={priority ? "sync" : "async"}
      importance={priority ? "high" : undefined}
      crossOrigin={isRemote ? "anonymous" : undefined}
      onError={() => setErr(true)}
      {...rest}
    />
  );
}
