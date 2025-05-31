import React, { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          setIsAuthenticated(data.valid);
          if (data.valid) setToken(token);
        })
        .catch(err => {
          console.error("Error al verificar token:", err);
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
