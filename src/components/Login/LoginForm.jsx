import { useContext } from "react";
import { AuthContext } from "../../context/auth.contex";
import { Navigate, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../routes/routes";
import useForm from "../../hooks/useForm";

const LoginForm = () => {
  const { login, isAuthenticated, fetchError } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialState = { username: "", password: "" };

  const validateLogin = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const handleLogin = async () => {
    await login({ username: values.username, password: values.password });
    navigate(PrivateRoutes.HOME, { replace: true });
  };

  const { values, errors, handleChange, handleSubmit, getRef } = useForm(
    initialState,
    handleLogin,
    validateLogin
  );

  return (
    <>
      {isAuthenticated ? (
        <Navigate replace to={PrivateRoutes.HOME} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label text-light ">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control input-color "
              id="inputUsername"
              name="username"
              placeholder="Nombre de usuario"
              value={values.username}
              onChange={handleChange}
              ref={getRef("username")}
            />
            {errors.username && (
              <div className="text-danger mb-3">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label text-light">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control input-color"
              id="inputPassword"
              name="password"
              placeholder="Contraseña"
              value={values.password}
              onChange={handleChange}
              ref={getRef("password")}
            />
            {errors.password && (
              <div className="text-danger mb-3">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
          {fetchError && <div className="text-danger mb-3">{fetchError}</div>}
        </form>
      )}
    </>
  );
};

export default LoginForm;
