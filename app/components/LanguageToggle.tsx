"use client";

import React from "react";
import { useTranslation } from "../lib/translation";

const LanguageToggle: React.FC = () => {

  const { lang, setLang } = useTranslation();

  return (
    <div>
      <button
        onClick={() => setLang("cs")}
        className={`mr-2 px-2 py-1 border ${lang === "cs" ? "border-blue-500" : "border-transparent"}`}
      >
        CS
      </button>

      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 border ${lang === "en" ? "border-blue-500" : "border-transparent"}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
