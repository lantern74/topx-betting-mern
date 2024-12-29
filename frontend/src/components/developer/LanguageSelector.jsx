import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '20px' }}>
      <button onClick={() => changeLanguage('zh')} style={{ backgroundColor: i18n.language === 'zh' ? '#4CAF50' : '#f2f2f2', color: i18n.language === 'zh' ? 'white' : 'black', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
        中文
      </button>
      <button onClick={() => changeLanguage('en')} style={{ backgroundColor: i18n.language === 'en' ? '#4CAF50' : '#f2f2f2', color: i18n.language === 'en' ? 'white' : 'black', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
        English
      </button>
    </div>
  );
};

export default LanguageSelector;
