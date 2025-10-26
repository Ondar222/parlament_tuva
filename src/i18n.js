import { useMemo } from "react";
import { useData } from "./context/DataContext.jsx";

const dictionaries = {
  ru: {
    "nav.home": "Главная",
    "nav.about": "О парламенте",
    "nav.structure": "Структура",
    "nav.deputies": "Депутаты",
    "nav.documents": "Документы",
    "nav.news": "Новости",
    "nav.appeals": "Обращения",
    "nav.admin": "Админ",
    "home.news": "Новости",
    "home.calendar": "Календарь",
  },
  ty: {
    "nav.home": "Кол арын",
    "nav.about": "Парламент дугайында",
    "nav.structure": "Тургузуг",
    "nav.deputies": "Оралакчылар",
    "nav.documents": "Документилер",
    "nav.news": "Медээ",
    "nav.appeals": "Негелделер",
    "nav.admin": "Админ",
    "home.news": "Медээ",
    "home.calendar": "Календарь",
  },
};

export function useI18n() {
  const { state } = useData();
  const lang = state.settings.language || "ru";
  const dict = dictionaries[lang] || dictionaries.ru;
  return useMemo(
    () => ({
      t: (key) => dict[key] || dictionaries.ru[key] || key,
      lang,
    }),
    [dict, lang]
  );
}
