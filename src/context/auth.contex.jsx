import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import AuthService from "../services/auth.services";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [fetchError, setFetchError] = useState(null);

  const login = useCallback(async (data) => {
    try {
      const authService = new AuthService();
      await authService.login(data);
      const loginError = authService.getError();

      if (loginError) {
        throw new Error(loginError);
      }

      const authToken = authService.getToken();
      setToken(authToken);
      setIsAuthenticated(true);

      localStorage.setItem("authToken", authToken);
    } catch (error) {
      setFetchError(error.message || "Error al ingresar");
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const value = useMemo(
    () => ({ login, logout, token, isAuthenticated, fetchError }),
    [login, logout, token, isAuthenticated, fetchError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
