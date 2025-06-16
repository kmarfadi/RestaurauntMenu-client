import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/generalComponents/theme-provider';
import { CartProvider } from './components/generalComponents/cart-provider';
import MenuPage from './pages/menu/menu-page';
import { useEffect } from 'react';
import AdminPage from './pages/admin/admin-page';

function App() {
  useEffect(() => {
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