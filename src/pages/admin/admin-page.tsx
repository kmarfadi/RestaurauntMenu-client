import React from "react";
import "./admin-panel.css";
import { LoginForm } from "../../components/admin/LoginForm";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { ItemForm } from "../../components/admin/ItemForm";
import { DeleteForms } from "../../components/admin/DeleteForms";
import { Button } from "../../components/ui/button";
import { useAdminPanel } from "../../hooks/use-admin";

const AdminPanel: React.FC = () => {
  const { token, view, menuData, handleLogin, logout, fetchMenuData } = useAdminPanel();

  if (view === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <Button className="form-button" onClick={logout}>
        تسجيل الخروج
      </Button>
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