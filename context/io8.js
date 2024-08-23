import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Search": "Search",
      "Settings": "Settings",
      "Search Now!!!": "Search Now!!!"
    }
  },
  yo: {
    translation: {
      "Home": "Ile",
      "Search": "Ṣàwárí",
      "Settings": "Ìtọ́sọ́nà",
      "Search Now!!!": "Ṣàwárí Bayi!!!"
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
