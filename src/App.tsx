import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { CartProvider } from './components/cart-provider';
import MenuPage from './pages/menu/menu-page';
import { useEffect } from 'react';
import { loadCairoFont } from './assets/fonts';
import AdminPage from './pages/admin/admin-page';

function App() {
  useEffect(() => {
    loadCairoFont();
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

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