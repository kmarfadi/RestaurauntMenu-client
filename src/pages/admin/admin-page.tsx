import React, { useState, useEffect } from "react";
import "./admin-panel.css";
import { fetchMenu } from "../../lib/services";
import { LoginForm } from "../../components/admin/LoginForm";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { ItemForm } from "../../components/admin/ItemForm";
import { DeleteForms } from "../../components/admin/DeleteForms";

const AdminPanel: React.FC = () => {
  const [token, setToken] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
  );
  const [view, setView] = useState<"login" | "dashboard">("login");
  const [menuData, setMenuData] = useState<{
    categories: { id: number; name: string }[];
    items: { id: number; name: string; price: number; category_id: number }[];
  }>({ categories: [], items: [] });

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
      alert("فشل في جلب بيانات القائمة");
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

  if (view === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <button className="form-button" onClick={logout}>
        تسجيل الخروج
      </button>
      <h2 className="admin-title">لوحة المسؤول</h2>

      <hr />

      <CategoryForm token={token} onSuccess={fetchMenuData} />

      <hr />

      <ItemForm 
        token={token} 
        onSuccess={fetchMenuData} 
        categories={menuData.categories} 
      />

      <hr />

      <DeleteForms
        token={token}
        onSuccess={fetchMenuData}
        categories={menuData.categories}
        items={menuData.items}
      />
    </div>
  );
};

export default AdminPanel;