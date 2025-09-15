import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginData } from "../../types";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      onLogin(data.token);
    } catch (err) {
      alert("فشل تسجيل الدخول");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">تسجيل دخول المسؤول</h2>
      <div className="form-group">
        <input
          className="form-input"
          placeholder="اسم المستخدم"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <br />
        <div className="password-input-wrapper" style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            style={{ paddingLeft: "40px" }}
          />
        </div>
        <br />
        <button className="form-button" onClick={handleLogin}>
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};