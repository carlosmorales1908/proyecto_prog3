import { createContext, useCallback, useMemo, useState } from "react";
import AuthService from "../services/auth.services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAutheticated, setIsAutheticated] = useState(
    localStorage.getItem("authenticated") || false
  );

  const login = useCallback(async (data) => {
    const authService = new AuthService();

    await authService.login(data);

    const authToken = authService.getToken();
    setToken(authToken);
    setIsAutheticated(true);
    localStorage.setItem("authenticated", true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authenticated");
    setToken("");
  }, []);

  const value = useMemo(
    () => ({ login, logout, token, isAutheticated }),
    [login, logout, token, isAutheticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
