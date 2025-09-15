import React, { useState } from "react";
import { ItemData } from "../../types";
import { addItem } from "../../lib/services";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ItemFormProps {
  token: string;
  onSuccess: () => void;
  categories: { id: number; name: string }[];
}

export const ItemForm: React.FC<ItemFormProps> = ({ token, onSuccess, categories }) => {
  const [itemData, setItemData] = useState<ItemData>({
    name: "",
    description: "",
    price: 1000,
    image: "",
    category_id: 0,
  });
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        return data.url;
      }
      throw new Error("Failed to retrieve uploaded image URL");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      return "";
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploading(true);
      const url = await uploadToCloudinary(e.target.files[0]);
      setItemData({ ...itemData, image: url });
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!itemData.name || !itemData.description || !itemData.price || !itemData.image || !itemData.category_id) {
      alert("Please fill in all fields before adding the item");
      return;
    }
    try {
      await addItem(itemData, token);
      alert("Item added successfully!");
      setItemData({
        name: "",
        description: "",
        price: 1000,
        image: "",
        category_id: 0,
      });
      onSuccess();
    } catch (err) {
      alert("Failed to add item");
      console.error("Add item error:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Add Menu Item</CardTitle>
        <p className="text-sm text-muted-foreground">
          Create a new menu item with image
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="item-name" className="text-sm font-medium">
            Item Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="item-name"
            placeholder="Enter item name"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-description" className="text-sm font-medium">
            Description <span className="text-destructive">*</span>
          </Label>
          <Input
            id="item-description"
            placeholder="Enter item description"
            value={itemData.description}
            onChange={(e) =>
              setItemData({ ...itemData, description: e.target.value })
            }
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-price" className="text-sm font-medium">
            Price <span className="text-destructive">*</span>
          </Label>
          <Input
            id="item-price"
            type="number"
            placeholder="Enter price"
            value={itemData.price}
            onChange={(e) =>
              setItemData({ ...itemData, price: Number(e.target.value) })
            }
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-category" className="text-sm font-medium">
            Category <span className="text-destructive">*</span>
          </Label>
          <select
            id="item-category"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) =>
              setItemData({ ...itemData, category_id: Number(e.target.value) })
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="item-image-upload" className="text-sm font-medium">
            Item Image <span className="text-destructive">*</span>
          </Label>
          <Input
            id="item-image-upload"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">
            Image must be less than 5MB
          </p>
          {uploading && (
            <p className="text-sm text-muted-foreground">Uploading image...</p>
          )}
          {itemData.image && (
            <div className="mt-3">
              <img
                src={itemData.image}
                alt="Item preview"
                className="w-full h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        <Button onClick={handleSubmit} className="w-full h-10">
          Add Item
        </Button>
      </CardContent>
    </Card>
  );
};