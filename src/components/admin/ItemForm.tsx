import React, { useState } from "react";
import { ItemData } from "../../types";
import { addItem } from "../../lib/services";

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
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
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
      alert("فشل رفع الصورة. يرجى المحاولة مرة أخرى.");
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
      alert("يرجى ملء جميع الحقول قبل إضافة العنصر");
      return;
    }
    try {
      await addItem(itemData, token);
      alert("تمت إضافة العنصر!");
      setItemData({
        name: "",
        description: "",
        price: 1000,
        image: "",
        category_id: 0,
      });
      onSuccess();
    } catch (err) {
      alert("فشل في إضافة العنصر");
      console.error("Add item error:", err);
    }
  };

  return (
    <section className="admin-section">
      <h2 className="section-title">إضافة عنصر</h2>
      <div className="form-group">
        <label htmlFor="item-name" className="form-label">
          الاسم <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="item-name"
          className="form-input"
          placeholder="الاسم"
          value={itemData.name}
          onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
        />
        <br />
        <label htmlFor="item-description" className="form-label">
          الوصف <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="item-description"
          className="form-input"
          placeholder="الوصف"
          value={itemData.description}
          onChange={(e) =>
            setItemData({ ...itemData, description: e.target.value })
          }
        />
        <br />
        <label htmlFor="item-price" className="form-label">
          السعر <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="item-price"
          className="form-input"
          type="number"
          placeholder="السعر"
          value={itemData.price}
          onChange={(e) =>
            setItemData({ ...itemData, price: Number(e.target.value) })
          }
        />
        <br />
        <label htmlFor="item-image-upload" className="form-label">
          ارفع صورة المنتج <span style={{ color: "red" }}>*</span>
          <br />
          <span style={{ color: "red", fontSize: "12px" }}>
            (يجب أن تكون الصورة أقل من 5 ميجابايت)
          </span>
        </label>
        <input
          id="item-image-upload"
          className="form-input"
          type="file"
          onChange={handleImageUpload}
        />
        {uploading && <p>جارٍ رفع الصورة...</p>}
        {itemData.image && (
          <img
            src={itemData.image}
            alt="Item Image Preview"
            className="w-full h-auto mt-2"
          />
        )}
        <br />
        <label htmlFor="item-category" className="form-label">
          اختر فئة <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="item-category"
          className="form-select"
          onChange={(e) =>
            setItemData({ ...itemData, category_id: Number(e.target.value) })
          }
        >
          <option value="">اختر فئة</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <button className="form-button" onClick={handleSubmit}>
          إضافة العنصر
        </button>
      </div>
    </section>
  );
};