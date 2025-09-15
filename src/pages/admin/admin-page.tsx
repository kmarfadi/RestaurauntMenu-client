import React from "react";
import { LoginForm } from "../../components/adminComponents/LoginForm";
import { CategoryForm } from "../../components/adminComponents/CategoryForm";
import { ItemForm } from "../../components/adminComponents/ItemForm";
import { DeleteForms } from "../../components/adminComponents/DeleteForms";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { useAdminPanel } from "../../hooks/use-admin";

const AdminPanel: React.FC = () => {
  const { token, view, menuData, handleLogin, logout, fetchMenuData } = useAdminPanel();

  if (view === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <div className="flex-1"></div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-2">
                Manage your restaurant menu and categories
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <Button variant="destructive" onClick={logout} className="h-10">
                Logout
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CategoryForm token={token} onSuccess={fetchMenuData} />
          <ItemForm 
            token={token} 
            onSuccess={fetchMenuData} 
            categories={menuData.categories} 
          />
        </div>

        <Separator />

        {/* Delete Section */}
        <DeleteForms
          token={token}
          onSuccess={fetchMenuData}
          categories={menuData.categories}
          items={menuData.items}
        />
      </div>
    </div>
  );
};

export default AdminPanel;