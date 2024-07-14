import { createContext, useCallback, useMemo, useState } from "react";
import AuthService from "../services/auth.services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = useCallback(async (data) => {
    const authService = new AuthService();

    await authService.login(data);

    const authToken = authService.getToken();
    setToken(authToken);
    localStorage.setItem("token", authToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
  }, []);

  const value = useMemo(
    () => ({ login, logout, token }),
    [login, logout, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
