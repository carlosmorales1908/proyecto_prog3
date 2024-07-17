import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../routes/routes";

const Login = () => {
  const { login, isAutheticated } = useContext(AuthContext);
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const navigate = useNavigate();

  isAutheticated && <Navigate to={PrivateRoutes.HOME} />;

  const handleClick = async () => {
    await login({ username, password });
    navigate(`/${PrivateRoutes.HOME}`, { replace: true });
  };

  return (
    <>
      {isAutheticated ? (
        <Navigate replace to={PrivateRoutes.HOME} />
      ) : (
        <button onClick={handleClick}>Login</button>
      )}
    </>
  );
};

export default Login;
