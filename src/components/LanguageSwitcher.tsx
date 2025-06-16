import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = async () => {
    try {
      setIsChanging(true);
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      await i18n.changeLanguage(newLang);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      localStorage.setItem('i18nextLng', newLang);
      setCurrentLang(newLang);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1"
      disabled={isChanging}
    >
      <Globe className="h-3 w-3" />
      {currentLang === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}; 