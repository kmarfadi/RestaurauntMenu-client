import { useState, useEffect } from 'react';
import { fetchMenu } from '../lib/services';

interface MenuData {
  categories: { id: number; name: string }[];
  items: { id: number; name: string; price: number; category_id: number }[];
}

export const useAdminPanel = () => {
  const [token, setToken] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
  );
  const [view, setView] = useState<"login" | "dashboard">("login");
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchMenuData();
    }
  }, []);

  const fetchMenuData = async () => {
    try {
      const data = await fetchMenu();
      setMenuData(data);
    } catch (err) {
      alert("Failed to fetch menu data");
      console.error("Fetch menu data error:", err);
    }
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setView("dashboard");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken("");
    setView("login");
  };

  return {
    token,
    view,
    menuData,
    handleLogin,
    logout,
    fetchMenuData
  };
};