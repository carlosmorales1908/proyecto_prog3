import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.contex";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";
import useForm from "../../hooks/useForm";

const LoginForm = () => {
  const { login, isAuthenticated, fetchError } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };
  
  const handleLogin = async () => {
      await login({ username: values.username, password: values.password });
      navigate(PrivateRoutes.HOME, { replace: true });
  };
  
  const { values, errors, handleChange, handleSubmit, getRef } = useForm(
    initialState,
    handleLogin
  );

  return (
    <>
      {isAuthenticated ? (
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
            />
            {errors.username&&(<div className="text-danger mb-3">{errors.username}</div>)}
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
            />
            {errors.password&&(<div className="text-danger mb-3">{errors.password}</div>)}
          </div>
          <button type="submit" className="btn btn-outline-success w-100">
            Login
          </button>
          {fetchError&&(<div className="text-danger mb-3">{fetchError}</div>)}
        </form>
      )}
    </>
  );
};

export default LoginForm;
