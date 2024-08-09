import React from "react";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100 bg-black bg-gradient text-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card card-custom bg-black p-2 text-white bg-opacity-75 text-light shadow-lg">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img
                    src="/minilogo3.png"
                    alt="melodify"
                    className="img-fluid"
                    style={{ maxWidth: "150px" }}
                  />
                  <h2 className="card-title mt-3">
                    <strong>Inicia sesión</strong>
                  </h2>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
