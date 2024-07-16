import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";
import { useContext } from "react";
import { PublicRutes } from "../routes/routes";

export const AuthGuard = ({ privateValidation }) => {
  const { isAutheticated } = useContext(AuthContext);
  return isAutheticated ? (
    privateValidation ? (
      <Outlet />
    ) : (
      <Navigate replace to="" />
    )
  ) : (
    <Navigate replace to={PublicRutes.LOGIN} />
  );
};

export default AuthGuard;
