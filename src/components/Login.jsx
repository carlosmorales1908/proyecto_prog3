import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../routes/routes";

const Login = () => {
  const { login } = useContext(AuthContext);
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const navigate = useNavigate();

  const handleClick = async () => {
    await login({ username, password });
    navigate(`/${PrivateRoutes.HOME}`, { replace: true });
  };

  return <button onClick={handleClick}>Login</button>;
};

export default Login;
