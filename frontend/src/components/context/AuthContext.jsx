import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Extract token from URL and verify it
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("https://studysphere-dijr.onrender.com/auth/verify-token", { token })
        .then((res) => {
          if (res.data.valid) {
            setUser({
              name: res.data.name,
              email: res.data.email,
            });
          } else {
            setUser(null);
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.error("Token verification failed", err);
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, loading, logout, getToken ,isLoggedIn: !!user  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
