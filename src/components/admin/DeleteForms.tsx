import React from "react";
import { deleteCategory, deleteItem } from "../../lib/services";

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
    if (confirm("هل أنت متأكد أنك تريد حذف هذه الفئة؟")) {
      try {
        await deleteCategory(id, token);
        alert("تم حذف الفئة!");
        onSuccess();
      } catch (err) {
        alert("فشل في حذف الفئة");
        console.error("Delete category error:", err);
      }
    }
  };

  const handleItemDelete = async (id: number) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا العنصر؟")) {
      try {
        await deleteItem(id, token);
        alert("تم حذف العنصر!");
        onSuccess();
      } catch (err) {
        alert("فشل في حذف العنصر");
        console.error("Delete item error:", err);
      }
    }
  };

  return (
    <>
      <section className="admin-section">
        <h2 className="section-title">حذف فئة</h2>
        <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
          ملاحظة: تأكد من مراجعة العناصر المرتبطة قبل حذف الفئة.
        </p>
        <select
          className="form-select"
          onChange={(e) => handleCategoryDelete(Number(e.target.value))}
        >
          <option value="">اختر فئة للحذف</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">حذف عنصر</h2>
        <select
          className="form-select"
          onChange={(e) => handleItemDelete(Number(e.target.value))}
        >
          <option value="">اختر عنصر للحذف</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </section>
    </>
  );
};