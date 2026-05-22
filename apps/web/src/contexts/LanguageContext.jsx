
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const translations = {
      en: {
        home: 'Home',
        travelPlans: 'Travel Plans',
        universities: 'Universities',
        languageCenters: 'Language Centers',
        about: 'About',
        contact: 'Contact',
        discover: 'Discover Luxury Travel Experiences',
        searchDest: 'Where to?',
        searchBtn: 'Search',
        featured: 'Featured Trips',
        viewDetails: 'View Details',
        duration: 'Days',
        price: 'From',
        filters: 'Filters',
        allDestinations: 'All Destinations'
      },
      ar: {
        home: 'الرئيسية',
        travelPlans: 'خطط السفر',
        universities: 'الجامعات',
        languageCenters: 'مراكز اللغات',
        about: 'معلومات عنا',
        contact: 'اتصل بنا',
        discover: 'اكتشف تجارب السفر الفاخرة',
        searchDest: 'إلى أين؟',
        searchBtn: 'بحث',
        featured: 'رحلات مميزة',
        viewDetails: 'عرض التفاصيل',
        duration: 'أيام',
        price: 'من',
        filters: 'عوامل التصفية',
        allDestinations: 'كل الوجهات'
      }
    };
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
