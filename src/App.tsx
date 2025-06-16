import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/generalComponents/theme-provider';
import { CartProvider } from './components/generalComponents/cart-provider';
import MenuPage from './pages/menu/menu-page';
import { useEffect } from 'react';
import AdminPage from './pages/admin/admin-page';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial language and direction based on i18n
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <CartProvider>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<MenuPage />} />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;