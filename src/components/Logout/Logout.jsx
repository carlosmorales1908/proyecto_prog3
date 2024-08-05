import { Navigate } from "react-router-dom";
import { PublicRutes } from "../../routes/routes";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.contex";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to={PublicRutes.LOGIN} />;
};
export default Logout;
