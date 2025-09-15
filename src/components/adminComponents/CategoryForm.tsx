import React, { useState } from "react";
import { CategoryData } from "../../types";
import { addCategory } from "../../lib/services";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CategoryFormProps {
  token: string;
  onSuccess: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ token, onSuccess }) => {
  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: "",
  });

  const handleSubmit = async () => {
    try {
      await addCategory(categoryData, token);
      alert("Category added successfully!");
      setCategoryData({ name: "" });
      onSuccess();
    } catch (err) {
      alert("Failed to add category");
      console.error("Add category error:", err);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Add Category</CardTitle>
        <p className="text-sm text-muted-foreground">
          Create a new menu category
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category-name" className="text-sm font-medium">
            Category Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="category-name"
            placeholder="Enter category name"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
            className="h-10"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full h-10">
          Add Category
        </Button>
      </CardContent>
    </Card>
  );
};