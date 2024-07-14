import { useContext } from "react";
import { AuthContext } from "../context/auth.contex";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const username = "35106743";
  const password = "apN4zqWegd";

  const handleClick = () => {
    login({ username, password });
    console.log(token);
  };

  return <button onClick={handleClick}>Login</button>;
};

export default Login;
