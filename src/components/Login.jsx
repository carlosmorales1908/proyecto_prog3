import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../routes/routes";

const Login = () => {
  const { login, isAutheticated } = useContext(AuthContext);
  const navigate = useNavigate();

  isAutheticated && <Navigate to={PrivateRoutes.HOME} />;

  const handleClick = async () => {
    try {
      const username = import.meta.env.VITE_USERNAME;
      const password = import.meta.env.VITE_PASSWORD;
      await login({ username, password });
      navigate(`${PrivateRoutes.HOME}`, { replace: true });
    } catch (error) {
      console.log("Error al logear:", error);
    }
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
