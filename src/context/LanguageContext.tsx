import React, { createContext, useContext, useState } from 'react';
//import Services from '../pages/Services';
//import ArbeitsSchutz from '../pages/ArbeitsSchutz';
//import Contact from '../pages/Contact';
//import Imprint from '../pages/Imprint';
//import HomePage from '../pages/HomePage';
//import KnowledgePage from '../pages/KnowledgePage';
//import loginPage from '../pages/LoginPage'
//import TicketsPage from '../pages/TicketsPage';

type Language = 'de' | 'en';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  home: {
    en: 'Home',
    de: 'Startseite'
  },
  tickets: {
    en: 'Tickets',
    de: 'Tickets'
  },
  knowledgeBase: {
    en: 'Knowledge Base',
    de: 'Wissensdatenbank'
  },
  Services: {
    en: 'Services',
    de: 'Dienste'
  },
  newTicket: {
    en: 'New Ticket',
    de: 'Neues Ticket'
  },
  search: {
    en: 'Search',
    de: 'Suchen'
  },
  login: {
    en: 'Login',
    de: 'Anmelden'
  },
  logout: {
    en: 'Logout',
    de: 'Abmelden'
  },
  register: {
    en: 'Register',
    de: 'Registrieren'
  },
  contact: {
    en: 'How can we Help',
    de: 'Kontakt'
  },
  imprint: {
    en: 'Site Notice',
    de: 'Impressum'
  },
  ticketResponse: {
    en: 'Add Response',
    de: 'Antwort hinzufügen'
  },
  save: {
    en: 'Save',
    de: 'Speichern'
  },
  cancel: {
    en: 'Cancel',
    de: 'Abbrechen'
  }
   
  };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};