import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("langData");
    return saved ? JSON.parse(saved) : "en";
  });

  useEffect(() => {
    localStorage.setItem("langData", JSON.stringify(lang));
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// custom hook
export const useLanguage = () => useContext(LanguageContext);