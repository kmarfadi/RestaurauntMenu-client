import React, { useState } from "react";
import { CategoryData } from "../../types";
import { addCategory } from "../../lib/services";

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
      alert("تمت إضافة الفئة!");
      setCategoryData({ name: "" });
      onSuccess();
    } catch (err) {
      alert("فشل في إضافة الفئة");
      console.error("Add category error:", err);
    }
  };

  return (
    <section className="admin-section">
      <h2 className="section-title">إضافة فئة</h2>
      <div className="form-group">
        <label htmlFor="category-name" className="form-label">
          الاسم <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="category-name"
          className="form-input"
          placeholder="الاسم"
          value={categoryData.name}
          onChange={(e) =>
            setCategoryData({ ...categoryData, name: e.target.value })
          }
        />
        <br />
        <button className="form-button" onClick={handleSubmit}>
          إضافة الفئة
        </button>
      </div>
    </section>
  );
};