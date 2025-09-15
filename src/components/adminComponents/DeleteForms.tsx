import React from "react";
import { deleteCategory, deleteItem } from "../../lib/services";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

interface DeleteFormsProps {
  token: string;
  onSuccess: () => void;
  categories: { id: number; name: string }[];
  items: { id: number; name: string }[];
}

export const DeleteForms: React.FC<DeleteFormsProps> = ({
  token,
  onSuccess,
  categories,
  items,
}) => {
  const handleCategoryDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id, token);
        alert("Category deleted successfully!");
        onSuccess();
      } catch (err) {
        alert("Failed to delete category");
        console.error("Delete category error:", err);
      }
    }
  };

  const handleItemDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id, token);
        alert("Item deleted successfully!");
        onSuccess();
      } catch (err) {
        alert("Failed to delete item");
        console.error("Delete item error:", err);
      }
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Delete Items</h2>
        <p className="text-muted-foreground mt-1">
          Remove categories or menu items from your restaurant
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delete Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-destructive">
              ⚠️ Warning: Make sure to review associated items before deleting a category.
            </p>
            <div className="space-y-2">
              <Label htmlFor="delete-category" className="text-sm font-medium">
                Select Category to Delete
              </Label>
              <select
                id="delete-category"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => handleCategoryDelete(Number(e.target.value))}
              >
                <option value="">Select category to delete</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delete Menu Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-item" className="text-sm font-medium">
                Select Item to Delete
              </Label>
              <select
                id="delete-item"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => handleItemDelete(Number(e.target.value))}
              >
                <option value="">Select item to delete</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};