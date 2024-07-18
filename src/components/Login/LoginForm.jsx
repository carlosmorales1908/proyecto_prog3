import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.contex";
import { Navigate,useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login,isAutheticated  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate(PrivateRoutes.HOME, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
    {isAutheticated ? (
      <Navigate replace to={PrivateRoutes.HOME} />
    ) : (
       <form>

      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="email address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="button" className="btn btn-outline-primary d-block mx-auto" onClick={handleSubmit}>
        Login
      </button>
    </form>
    )}
   </>
  );
};

export default LoginForm;
