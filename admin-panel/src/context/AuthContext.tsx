/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContextType, User } from "@/types/Auth";
import { createContext, useState, useCallback, useEffect } from "react";
import CryptoJS from "crypto-js";

interface ReturnType {
  user: string;
  token: string;
  role: string;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(true);
  // const ENCRYPTION_KEY = `${import.meta.env.VITE_REACT_APP_ENCRYPTION_KEY}`;
  // const STORAGE_NAME = `${
  //   import.meta.env.VITE_REACT_APP_USER_INFO_STORAGE_KEY
  // }`;
  const ENCRYPTION_KEY = "zulu";
  const STORAGE_NAME = "Zulu";
  const encryptData = (data: User | string) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      ENCRYPTION_KEY
    ).toString();
  };

  const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const login = useCallback((token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem(
      "Zulu",
      JSON.stringify({
        token: encryptData(token),
        user: encryptData(user),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_NAME);
    localStorage.removeItem("Zulu");
  }, []);

  let loginData;
  useEffect(() => {
    // const storedData = JSON.parse(localStorage.getItem("Lively_User") || "") as any;
    const storedData: string | null = localStorage.getItem(STORAGE_NAME);
    let userData: ReturnType | null = null;
    if (storedData !== null) {
      userData = JSON.parse(storedData);
      if (userData?.token) {
        loginData = login(
          decryptData(userData?.token),
          decryptData(userData?.user)
        );
        setLoaded(true);
      }
    }
    setLoaded(true);
  }, [loginData]);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        loaded,
        setLoaded,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
