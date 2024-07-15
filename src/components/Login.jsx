import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";

const Login = () => {
  const { login } = useContext(AuthContext);
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;

  const handleClick = () => {
    login({ username, password });
  };

  return <button onClick={handleClick}>Login</button>;
};

export default Login;
