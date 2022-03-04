import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useEffect, useState, createContext } from "react";
import { Spin } from "antd";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubcribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });

        setIsLoading(false);
        navigate("/");
        return;
      }

      navigate("/login");
      setIsLoading(false);
    });

    return () => {
      unSubcribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
