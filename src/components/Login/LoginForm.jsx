import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.contex";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";
import useForm from "../../hooks/useForm";

const LoginForm = () => {
  const { login, isAutheticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialState = { username: "", password: "" };
  const { values, handleChange, handleSubmit, getRef } = useForm(
    initialState,
    async () => {
      try {
        await login({ username: values.username, password: values.password });
        navigate(PrivateRoutes.HOME, { replace: true });
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  );

  return (
    <>
      {isAutheticated ? (
        <Navigate replace to={PrivateRoutes.HOME} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label text-light ">
              Username
            </label>
            <input
              type="text"
              className="form-control bg-transparent text-light border border-success "
              id="inputUsername"
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              ref={getRef("username")}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-light border border-success"
              id="inputPassword"
              name="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              ref={getRef("password")}
              required
            />
          </div>

          <button type="submit" className="btn btn-outline-success w-100">
            Login
          </button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
