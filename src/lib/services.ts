import axios from "axios";

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("VITE_API_BASE_URL is not set. Using default http://localhost:3003");
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003";

export async function fetchMenu() {
  const response = await axios.get(`${API_BASE_URL}/menu`);
  return response.data;
}

export async function submitOrder(orderData: unknown) {
  const response = await axios.post(`${API_BASE_URL}/checkout`, orderData);
  return response.data;
}

export async function loginAdmin(loginData: { username: string; password: string }) {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, loginData);
  return response.data.token;
}

export async function addCategory(categoryData: { name: string }, token: string) {
  const response = await axios.post(`${API_BASE_URL}/admin/category`, categoryData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function addItem(itemData: {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
}, token: string) {
  const response = await axios.post(`${API_BASE_URL}/admin/item`, itemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteCategory(id: number, token: string) {
  const response = await axios.delete(`${API_BASE_URL}/admin/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteItem(id: number, token: string) {
  const response = await axios.delete(`${API_BASE_URL}/admin/item/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}