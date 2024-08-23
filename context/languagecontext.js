import React, { createContext, useState, useContext } from 'react';
import { translateText, detectLanguage } from './translateText'; // Ensure path is correct

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default language

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Function to detect language of a given text and set it in state
  const detectAndSetLanguage = async (text) => {
    try {
      const detectedLanguage = await detectLanguage(text);
      setLanguage(detectedLanguage);
      return detectedLanguage;
    } catch (error) {
      console.error('Error detecting language:', error);
      return 'en'; // Fallback to English in case of error
    }
  };

  const translate = async (text) => {
    try {
      return await translateText(text, language);
    } catch (error) {
      console.error("Error during translation:", error);
      return text; // Return original text on error
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate, detectAndSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
