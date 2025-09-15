import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LoginData } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
      
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        throw new Error(`Server returned invalid JSON: ${res.status} ${res.statusText}`);
      }
      
      if (!res.ok) {
        // Extract human-friendly error message from server response
        let errorMessage = 'Login failed. Please try again.';
        
        if (data && typeof data === 'object') {
          if (data.message && typeof data.message === 'string') {
            errorMessage = data.message;
          } else if (data.error && typeof data.error === 'string') {
            errorMessage = data.error;
          }
        }
        
        // Handle specific error cases
        if (res.status === 401) {
          errorMessage = 'Invalid username or password. Please check your credentials and try again.';
        } else if (res.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (res.status >= 400 && res.status < 500) {
          errorMessage = 'Invalid request. Please check your input and try again.';
        }
        
        throw new Error(errorMessage);
      }
      
      if (!data.token) {
        throw new Error('No authentication token received from server');
      }
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      onLogin(data.token);
    } catch (err) {
      // Simple and reliable error message extraction
      let errorMessage = "Unknown error occurred";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        errorMessage = String(err);
      }
      
      alert(`Login failed: ${errorMessage}`);
      console.error("Login error details:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-foreground">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access the admin panel
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="pr-10 h-11"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="w-full h-11 text-base font-medium"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};