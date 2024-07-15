import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.contex";
import { useContext } from "react";
import { PublicRutes } from "../routes/routes";

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = <Navigate replace to="" />;

export const AuthGuard = ({ privateValidation }) => {
  const { token } = useContext(AuthContext);
  return token ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRutes.LOGIN} />
  );
};

export default AuthGuard;
